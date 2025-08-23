import { Inngest } from "inngest";
import User from "../Models/User.js";
import Connection from "../Models/Connection.js";
import dotenv from "dotenv";
import sendEmail from "../configs/nodeMailer.js";
import Story from "../Models/Story.js";
dotenv.config();
// Create a client to send and receive events
export const inngest = new Inngest({ id: "my-app" });

// ingest fuction to save user data in db
const syncUserCreation = inngest.createFunction(
  { id: "sync-user-from-clerk" },
  { event: "clerk/user.created" },
  async ({ event }) => {
    const { id, first_name, last_name, email_addresses, image_url } =
      event.data;
    let username = email_addresses[0].email_address.split("@")[0];

    //    check availability of username
    const user = await User.findOne({ username });

    if (user) {
      username = username + Math.floor(Math.random() * 1000);
    }

    const userdata = {
      _id: id,
      full_name: `${first_name} ${last_name}`,
      username,
      email: email_addresses[0].email_address,
      profile_picture: image_url,
    };
    await User.create(userdata);
  }
);

// Inngest fuction to update user data in database
const syncUserUpdate = inngest.createFunction(
  { id: "update-user-from-clerk" },
  { event: "clerk/user.updated" },
  async ({ event }) => {
    const { id, first_name, last_name, email_addresses, image_url } =
      event.data;
    const updatedUserData = {
      email: email_addresses[0].email_address,
      profile_picture: image_url,
      full_name: `${first_name} ${last_name}`,
    };

    //
    await User.findByIdAndUpdate(id, updatedUserData);
  }
);
// Ingest function to delete user
const deleteUser = inngest.createFunction(
  { id: "delete-user-with-clerk" },
  { event: "clerk/user.deleted" },
  async ({ event }) => {
    const { id } = event.data;

    //
    await User.findByIdAndDelete(id);
  }
);

// INGEST FUNCTION TO SEND REMINDER WHAT NEW CONNECTION REQUEST ADDED
const sendNewConnectionRequestReminder = inngest.createFunction(
  { id: "send-new-connection-request-reminder" },
  { event: "app/connection-request" },
  async ({ event, step }) => {
    const { connectionId } = event.data;
    await step.run("send-connection-request-mail", async () => {
      const connection = await Connection.findById(connectionId).populate(
        "from_user_id to_user_id"
      );
      const subject = "New Connection Request";
      const body = `
  <div style="background-color: #f3f4f6; padding: 2.5rem; border-radius: 1rem; text-align: center; max-width: 600px; margin: 2rem auto;">
    <div style="background-color: white; padding: 2rem; border-radius: 0.75rem; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);">
      <h2 style="font-size: 1.5rem; font-weight: 700; color: #1f2937; margin-bottom: 1rem;">New Connection Request</h2>
      <p style="font-size: 1rem; color: #4b5563; line-height: 1.5rem;">
        You have a new connection request from <span style="font-weight: 600; color: #4338ca;">${connection.from_user_id.full_name}</span> - <span style="color: #6b7280; font-style: italic;">@${connection.from_user_id.username}</span>
      </p>
      <div style="margin-top: 2rem;">
        <a href="${process.env.FRONTEND_URL}/connections" style="display: inline-block; background-color: #4338ca; color: #ffffff; padding: 0.75rem 1.5rem; border-radius: 0.5rem; text-decoration: none; font-weight: 600;">
          Check the Request
        </a>
      </div>
      <br/>
      <p style="font-size: 0.875rem; color: #6b7280; margin-top: 2rem;">
        Thank you
      </p>
      <p style="font-size: 0.875rem; color: #6b7280;">
        Social App
      </p>
    </div>
  </div>
`;
      await sendEmail({
        to: connection.to_user_id.email,
        subject,
        body,
      });
    });
    const in24Hours = new Date(Date.now() + 24 * 60 * 60 * 1000);
    await step.sleepUntil("send-reminder-mail", in24Hours);
    await step.run("send-connection-request-reminder", async () => {
      const connection = await Connection.findById(connectionId).populate(
        "from_user_id to_user_id"
      );
      if (connection.status === "accepted") {
        return { message: "connection request accepted" };
      }
      const subject = "New Connection Request";
      const body = `
  <div style="background-color: #f3f4f6; padding: 2.5rem; border-radius: 1rem; text-align: center; max-width: 600px; margin: 2rem auto;">
    <div style="background-color: white; padding: 2rem; border-radius: 0.75rem; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);">
      <h2 style="font-size: 1.5rem; font-weight: 700; color: #1f2937; margin-bottom: 1rem;">New Connection Request</h2>
      <p style="font-size: 1rem; color: #4b5563; line-height: 1.5rem;">
        You have a new connection request from <span style="font-weight: 600; color: #4338ca;">${connection.from_user_id.full_name}</span> - <span style="color: #6b7280; font-style: italic;">@${connection.from_user_id.username}</span>
      </p>
      <div style="margin-top: 2rem;">
        <a href="${process.env.FRONTEND_URL}/connections" style="display: inline-block; background-color: #4338ca; color: #ffffff; padding: 0.75rem 1.5rem; border-radius: 0.5rem; text-decoration: none; font-weight: 600;">
          Check the Request
        </a>
      </div>
      <br/>
      <p style="font-size: 0.875rem; color: #6b7280; margin-top: 2rem;">
        Thank you
      </p>
      <p style="font-size: 0.875rem; color: #6b7280;">
        Social App
      </p>
    </div>
  </div>
`;
      await sendEmail({
        to: connection.to_user_id.email,
        subject,
        body,
      });
      return { message: "reminder email sent" };
    });
  }
);

// ingest function to delete a story 24hrs
const deleteStory = inngest.createFunction(
  { id: "story-delete" },
  { event: "app/story.delete" },
  async ({ event, stop }) => {
    const { storyId } = event.data;
    const in24Hours = new Date(Date.now() + 24 * 60 * 60 * 1000);
    await step.sleepUntil("wait-for-24hrs", in24Hours);
    await step.run("delete-story", async () => {
      await Story.findByIdAndDelete(storyId);
      return { message: "story deleted" };
    });
  }
);

// Create an empty array where we'll export future Inngest functions
export const functions = [
  syncUserCreation,
  syncUserUpdate,
  deleteUser,
  sendNewConnectionRequestReminder,
  deleteStory,
];
