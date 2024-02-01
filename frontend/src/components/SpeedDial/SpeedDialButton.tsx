import {
  IconButton,
  SpeedDial,
  SpeedDialHandler,
  SpeedDialContent,
  SpeedDialAction,
  Typography,
} from "@material-tailwind/react";
import { PlusIcon, CogIcon } from "@heroicons/react/24/outline";
import { useStateDispatchContext } from "../../hooks/useStateDispatchHook";
import { memo } from "react";

const SpeedDialButton = memo(() => {
  const { setIsSettings, currentColor } = useStateDispatchContext();
  return (
    <div className="fixed right-4 bottom-4" style={{ zIndex: "1000" }}>
      <div className="relative w-full">
        <SpeedDial>
          <SpeedDialHandler>
            <IconButton
              placeholder=""
              size="lg"
              className={`rounded-full border-2`}
              style={{ backgroundColor: currentColor }}
            >
              <PlusIcon className="h-5 w-5 transition-transform group-hover:rotate-45" />
            </IconButton>
          </SpeedDialHandler>
          <SpeedDialContent placeholder="">
            <SpeedDialAction
              placeholder=""
              className={`relative text-white border-2`}
              onClick={() => setIsSettings(true)}
              style={{ backgroundColor: currentColor }}
            >
              <CogIcon className="h-5 w-5" />
              <Typography
                placeholder=""
                variant="small"
                color="blue-gray"
                className="absolute top-2/4 -left-2/4 -translate-y-2/4 -translate-x-3/4 font-semibold text-gray-800 dark:text-main-dark-text"
              >
                Settings
              </Typography>
            </SpeedDialAction>
          </SpeedDialContent>
        </SpeedDial>
      </div>
    </div>
  );
});

export default SpeedDialButton;
