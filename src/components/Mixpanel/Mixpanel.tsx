import { Mixpanel } from "@/utils/Mixpanel";
import { useEffect } from "react";

const MixpanelComponent = (props: any) => {
  useEffect(() => {
    Mixpanel.track(props.name, props.data);
  }, [props.data, props.name]);

  return props.children;
};

export default MixpanelComponent;
