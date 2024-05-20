import { Dialog, DialogTitle } from "@headlessui/react";
import React from "react";
import { useForm } from "react-hook-form";
import Button from "./Button";
import Loading from "./Loader";
import ModalWrapper from "./ModalWrapper";
import Textdaba from "./Textdaba";
import { useChangePasswordMutation } from "../redux/slices/api/userApiSlice";
import { toast } from "sonner";

const ChangePassword = ({ open, setOpen }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    
    const [changeUserPassword, { isLoading }] = useChangePasswordMutation();

    const handleOnSubmit = async (data) => {
        if (data.password !== data.cpass) {
            toast.warning("Passwords do not match");
            return;
        }
        try {
            const res = await changeUserPassword(data).unwrap();
            toast.success("Password updated successfully");

            setTimeout(() => {
                setOpen(false);
            }, 1500);
        } catch (err) {
            console.log(err);
            toast.error(err?.data?.message || err.error);
        }
    };

    return (
        <>
            <ModalWrapper open={open} setOpen={setOpen}>
                <form onSubmit={handleSubmit(handleOnSubmit)} className="">
                    <DialogTitle
                        as="h2"
                        className='text-base font-bold leading-6 text-gray-900'
                    >
                        Change Password
                    </DialogTitle>
                    <div className="mt-2 flex flex-col gap-6">
                        <Textdaba
                            placeholder="New Password"
                            type="password"
                            name="password"
                            label="New Password"
                            className="w-full rounded"
                            register={register("password", {
                                required: "New Password is required",
                            })}
                            error={errors.password? errors.password.message : ""} 
                        />
                        <Textdaba
                            placeholder="Confirm New Password"
                            type="password"
                            name="cpass"
                            label="Confirm New Password"
                            className="w-full rounded"
                            register={register("cpass", {
                                required: "Confirm New Password is required!",
                            })}
                            error={errors.cpass? errors.cpass.message : ""} 
                        />
                    </div>

                    {isLoading ? (
                        <div className="py-5">
                            <Loading />
                        </div>
                    ) : (
                        <div className="py-3 mt-4 sm:flex-row-reverse">
                            <Button
                                type="submit"
                                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded"
                                label="Save"
                            />

                            <button
                                type="button"
                                onClick={() => setOpen(false)}
                                className="bg-white px-5 text-sm font-semibold text-gray-900 sm:w-auto"
                            >
                                Cancel
                            </button>
                        </div>
                    )}
                </form>
            </ModalWrapper>
        </>
    )
}

export default ChangePassword