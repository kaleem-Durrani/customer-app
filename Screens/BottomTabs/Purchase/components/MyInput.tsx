import {
  View,
  Text,
  FormControl,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
  AlertCircleIcon,
  Input,
  InputField,
} from "@gluestack-ui/themed";
import React from "react";

const MyInput = ({ value, onChange, placeholder, errorText }: any) => {
  return (
    <FormControl
      w={"$3/5"}
      m={"$3"}
      isDisabled={false}
      isInvalid={false}
      isReadOnly={false}
      isRequired={true}
    >
      <Input variant="rounded" size="lg">
        <InputField
          type="text"
          placeholder={placeholder}
          value={value}
          onChangeText={onChange}
          keyboardType="numeric" // This will open the numeric keyboard
          inputMode="numeric" // This ensures only numeric input is accepted
        />
      </Input>

      <FormControlError>
        <FormControlErrorIcon as={AlertCircleIcon} />
        <FormControlErrorText>{errorText}</FormControlErrorText>
      </FormControlError>
    </FormControl>
  );
};

export default MyInput;
