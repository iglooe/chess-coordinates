import { cn } from "@/libs/cn";
import type { ComponentProps, ParentComponent } from "solid-js";
import { splitProps } from "solid-js";

export const Card = (props: ComponentProps<"div">) => {
    const [local, rest] = splitProps(props, ["class"]);

    return (
        <div
            class={cn(
                "rounded-md flex flex-col justify-center items-center bg-[#262421] text-card-foreground shadow",
                local.class,
            )}
            {...rest}
        />
    );
};

export const CardHeader = (props: ComponentProps<"div">) => {
    const [local, rest] = splitProps(props, ["class"]);

    return (
        <div class={cn("flex flex-col space-y-1.5 mt-4", local.class)} {...rest} />
    );
};

export const CardTitle: ParentComponent<ComponentProps<"h1">> = (props) => {
    const [local, rest] = splitProps(props, ["class"]);

    return (
        <h1
            class={cn("font-thin leading-none text-3xl text-[#bababa]", local.class)}
            {...rest}
        />
    );
};

export const CardDescription: ParentComponent<ComponentProps<"h3">> = (
    props,
) => {
    const [local, rest] = splitProps(props, ["class"]);

    return (
        <h3 class={cn("text-sm text-muted-foreground", local.class)} {...rest} />
    );
};

export const CardContent = (props: ComponentProps<"div">) => {
    const [local, rest] = splitProps(props, ["class"]);

    return <div class={cn("my-6 font-semibold text-7xl text-[#bababa] font-dseg", local.class)} {...rest} />;
};

export const CardFooter = (props: ComponentProps<"div">) => {
    const [local, rest] = splitProps(props, ["class"]);

    return (
        <div class={cn("flex items-center p-6 pt-0", local.class)} {...rest} />
    );
};
