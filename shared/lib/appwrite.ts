import { Account, Client, Databases } from "appwrite";

const client: Client = new Client();
client
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT as string) // Your API Endpoint
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID as string); // Your project ID;

const databases: Databases = new Databases(client);

const account: Account = new Account(client);
export { account, client, databases };
