import {
  View,
  Text,
  ButtonText,
  Center,
  Button,
  Modal,
  ModalBackdrop,
  ModalContent,
  ModalHeader,
  Heading,
  ModalCloseButton,
  Icon,
  CloseIcon,
  ModalBody,
  ModalFooter,
  VStack,
  HStack,
} from "@gluestack-ui/themed";
import React, { useState } from "react";
import QRCode from "react-native-qrcode-svg";
import { PERCENT } from "../../../../Constants/Constants";

const QRModal = ({ showModal, setShowModal, QRDictionary }: any) => {
  const generateQRString = (data: any) => {
    const jsonString = JSON.stringify(data);
    return jsonString;
  };

  const QRString = generateQRString(QRDictionary);

  return (
    <Center h={300}>
      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
        }}
      >
        <ModalBackdrop onPress={() => {}} />
        <ModalContent>
          <ModalHeader>
            <Heading size="lg">Have your QR scanned!</Heading>
            <ModalCloseButton>
              <Icon as={CloseIcon} size="xl" />
            </ModalCloseButton>
          </ModalHeader>
          <ModalBody>
            <View alignSelf="center" borderWidth={1} p={"$3"}>
              <QRCode value={QRString} size={PERCENT[50]} />
            </View>
          </ModalBody>
          <ModalFooter>
            {/* <Button
              variant="outline"
              size="sm"
              action="secondary"
              mr="$3"
              onPress={() => {
                setShowModal(false);
              }}
            >
              <ButtonText>Cancel</ButtonText>
            </Button> */}
            <VStack flex={1}>
              <HStack justifyContent="space-between">
                <Text size="xs" color="gray">
                  Fuel Type: {QRDictionary?.selectedFuel}
                </Text>
                <Text size="xs" color="gray">
                  Amount: {QRDictionary?.amount}
                </Text>
              </HStack>
              <HStack mb={"$2"} justifyContent="space-between">
                <Text size="xs" color="gray">
                  Litres:{QRDictionary?.litres}
                </Text>
                <Text size="xs" color="gray">
                  Payment Method: {QRDictionary?.selectedPaymentMethod}
                </Text>
              </HStack>
              <Text size="xs">user Id: {QRDictionary?.userId}</Text>

              <Button
                alignSelf="flex-end"
                size="sm"
                action="negative"
                borderWidth="$0"
                onPress={() => {
                  setShowModal(false);
                }}
              >
                <ButtonText>Regenerate QR</ButtonText>
              </Button>
            </VStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Center>
  );
};

export default QRModal;
