import mixpanel from "mixpanel-browser";

mixpanel.init(`${process.env.MIXPANEL_TOKEN}`);

const env_check: boolean = process.env.NODE_ENV === "development";
const actions = {
  identify: (id: any) => {
    if (env_check) mixpanel.identify(id);
  },
  alias: (id: any) => {
    if (env_check) mixpanel.alias(id);
  },
  track: (name: any, props: any) => {
    if (env_check) mixpanel.track(name, props);
  },
  people: {
    set: (props: any) => {
      if (env_check) mixpanel.people.set(props);
    },
  },
};

export const Mixpanel = actions;
