import { Text } from "react-native";

const ScreenTitle = ({ label }: {label: string}) => {

    return (
        <Text className="text-lg">
            {label}
        </Text>
    );
}