import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Select,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form/dist/index.ie11";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { useRowSelect } from "react-table";
import {
  editModalCleanUp,
  updateBankDetail,
} from "../../pages/UserTransaction/userTransactionSlice";
import { isEmptyObject } from "../../utils";
const EditBankDetailsModal = ({
  isOpen,
  onClose,
  bankDetails,
  updateBankDetails,
}) => {
  const [isError, setIsError] = useState(undefined);
  const {
    handleSubmit,
    errors,
    reset,
    register,
    formState,
    getValues,
  } = useForm();

  const toast = useToast();
  const dispatch = useDispatch();

  const editBankDetailStatus = useSelector(
    (state) => state.userTransactions.updateBankDetailStatus
  );
  const editBankDetailError = useSelector(
    (state) => state.userTransactions.updateBankDetailError
  );

  const bankDetailsToEdit = useSelector(
    (state) => state.userTransactions.bankDetailToEdit
  );
  const updatedBankDetails = useSelector(
    (state) => state.userTransactions.updatedBankDetails
  );

  const { userId } = useParams();

  const onSubmit = async () => {
    let data = getValues();

    let accountId = bankDetails.accountId;
    let payload = { ...data, accountId, userId };
    dispatch(updateBankDetail(payload));
  };

  useEffect(() => {
    return () => {
      dispatch(editModalCleanUp());
    };
  }, []);

  useEffect(() => {
    if (editBankDetailStatus === "succeeded") {
      toast({
        title: "Successfully edited Bank Details.",
        status: "success",
        position: "top-right",
        duration: 4000,
        isClosable: true,
      });
      updateBankDetails(updatedBankDetails);
      if (updatedBankDetails.length > 0) {
        onClose();
      }
    } else {
      toast({
        title: "Successfully edited Bank Details.",
        status: "error",
        description: editBankDetailError,
        position: "top-right",
        duration: 4000,
        isClosable: true,
      });
    }
  }, [editBankDetailStatus]);

  useEffect(() => {
    // sets default vlue in form felids
    if (!isEmptyObject(bankDetailsToEdit)) {
      reset(bankDetailsToEdit);
    }
  }, [bankDetailsToEdit]);
  return (
    <Modal
      isCentered
      blockScrollOnMount={false}
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Bank Details </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Account Holder name  */}
            <FormControl isRequired isInvalid={errors.name}>
              <FormLabel htmlFor="accountHolderName">
                Account Holder Name
              </FormLabel>
              <Input
                name="accountHolderName"
                placeholder="Account Holder Name "
                ref={register({
                  required: true, // JS only: <p>error message</p> TS only support string
                })}
              />
              <FormErrorMessage>
                {errors.name && errors.name.message}
              </FormErrorMessage>
            </FormControl>

            {/* Account Number  */}
            <FormControl isRequired isInvalid={errors.name}>
              <FormLabel htmlFor="accountNumber">Account Number</FormLabel>
              <Input
                name="accountNumber"
                placeholder="Account Number"
                ref={register({
                  required: true,
                })}
              />
              <FormErrorMessage>
                {errors.name && errors.name.message}
              </FormErrorMessage>
            </FormControl>

            {/* Accoubt Type */}
            <FormControl isInvalid={errors.name}>
              <FormLabel htmlFor="accountType">Account Type</FormLabel>
              <Select
                name="accountType"
                ref={register({
                  required: true,
                })}
              >
                <option value="Saving Account">Saving Account</option>
                <option value="Current Account">Current Account</option>
                <option value="UPI">UPI</option>
                <option value="PAYTM">PAYTM</option>
              </Select>

              <FormErrorMessage>
                {errors.name && errors.name.message}
              </FormErrorMessage>
            </FormControl>

            {/* Bank Name  */}
            <FormControl isRequired isInvalid={errors.name}>
              <FormLabel htmlFor="bankName">Bank Name</FormLabel>
              <Input
                name="bankName"
                placeholder="Account Holder Name "
                ref={register({
                  required: true,
                })}
              />
              <FormErrorMessage>
                {errors.name && errors.name.message}
              </FormErrorMessage>
            </FormControl>

            {/* IFSC CODE  */}
            <FormControl isRequired isInvalid={errors.name}>
              <FormLabel htmlFor="ifscCode">IFSC code</FormLabel>
              <Input
                name="ifscCode"
                placeholder="Account Holder Name "
                ref={register({
                  required: true,
                })}
              />
              <FormErrorMessage>
                {errors.name && errors.name.message}
              </FormErrorMessage>
            </FormControl>

            <Button
              mt={4}
              colorScheme="teal"
              isLoading={formState.isSubmitting}
              type="submit"
            >
              Submit
            </Button>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default EditBankDetailsModal;
