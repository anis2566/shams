import { Knock } from "@knocklabs/node";
const knock = new Knock(process.env.KNOCK_SECRET);

type SendNotification = {
  trigger: string;
  recipients: string[];
  actor: {
    id: string;
    name?: string;
  };
  data: {
    name?: string;
    redirectUrl?: string;
    status?: string;
  };
};

export const sendNotification = async ({
  trigger,
  recipients,
  actor,
  data,
}: SendNotification) => {
  await knock.workflows.trigger(trigger, {
    recipients,
    actor,
    data,
  });
};
