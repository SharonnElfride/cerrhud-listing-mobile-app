import { Button } from "@/components/ui/button";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    InputGroupInput,
} from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { InfoIcon, KeyRoundIcon, MailIcon } from "lucide-react";

const Login = () => {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-primary via-secondary to-accent">
      <div className="min-h-[80vh] md:min-h-[60vh] p-5 bg-white/10 backdrop-blur-md border border-white rounded-md shadow-xl m-5 min-w-2xs w-full max-w-2/3 grid grid-cols-1 md:grid-cols-2 overflow-hidden">
        <div className="hidden md:flex rounded-l-md bg-primary/50 items-center justify-center text-white text-3xl font-bold">
          Welcome Back
        </div>

        <div className="p-5 md:px-12 flex rounded-r-md max-sm:rounded-md flex-col h-full justify-between bg-white">
          <div className="text-end">
            <p className="font-bold text-2xl text-primary">Cerrhud Lab</p>
          </div>

          <div className="flex flex-col gap-5">
            <div className="flex md:hidden w-[200px] items-center m-auto">
              <img src="https://cdn.pixabay.com/photo/2025/09/17/11/18/medical-laboratory-9839358_1280.png" />
            </div>

            <h1 className="text-2xl font-semibold text-start text-foreground">
              Sign in to your account
            </h1>

            <form className="grid gap-5">
              <div className="flex flex-col items-start gap-2">
                <Label htmlFor="email">Email</Label>
                <InputGroup>
                  <InputGroupInput
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                  />
                  <InputGroupAddon>
                    <MailIcon />
                  </InputGroupAddon>
                </InputGroup>
              </div>
              <div className="flex flex-col items-start gap-2">
                <div className="flex w-full justify-between items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="hidden md:inline-block text-end text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>

                <InputGroup>
                  <InputGroupInput id="password" type="password" required />
                  <InputGroupAddon>
                    <KeyRoundIcon />
                  </InputGroupAddon>
                  <InputGroupAddon align="inline-end">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <InputGroupButton
                          variant="ghost"
                          aria-label="Info"
                          size="icon-xs"
                        >
                          <InfoIcon />
                        </InputGroupButton>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Password must be at least 8 characters</p>
                      </TooltipContent>
                    </Tooltip>
                  </InputGroupAddon>
                </InputGroup>
                <div>
                  <a
                    href="#"
                    className="max-md:flex text-end inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
              </div>
            </form>

            <Button type="submit" className="w-full">
              Login
            </Button>
          </div>

          <div className="text-end">
            <p className="text-muted-foreground text-xs">
              <p>Copyright © {new Date().getFullYear()} - Cerrhud</p>
            </p>
          </div>
        </div>
      </div>

      <div>
        <p className="text-secondary-foreground text-xs font-semibold">
          Made by{" "}
          <a
            href="https:sharonn.me"
            target="_blank"
            className="underline underline-offset-4 decoration-wavy"
          >
            Zase
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
