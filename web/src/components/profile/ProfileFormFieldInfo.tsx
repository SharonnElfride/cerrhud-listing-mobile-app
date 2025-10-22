import useIsMediumScreen from "@/hooks/useIsMediumScreen";

const ProfileFormFieldInfo = ({
  children,
  style,
  ...props
}: React.ComponentProps<"div">) => {
  const isDesktop = useIsMediumScreen();

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        width: isDesktop ? "20%" : "100%",
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
};

export default ProfileFormFieldInfo;
