import React from "react";
import * as z from "zod";
import { Models } from "appwrite";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Button,
  Input,
  Textarea,
} from "@/components/ui";

import { ProfileUpdateValidation } from "@/lib/validation";
import { useUserContext } from "@/context/AuthContext";
import { FileUploader } from "@/components/shared";
import { useToast } from "@/hooks/use-toast";
import { useUpdateProfile } from "@/lib/react-query/queriesAndMutations";

const UpdateProfileForm = () => {
  // update Name, Email, Password and Profile Picture
  const navigate = useNavigate();
  const { mutateAsync: updateProfile, isPending: isLoadingUpdate } =
    useUpdateProfile();
  const { user } = useUserContext();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof ProfileUpdateValidation>>({
    resolver: zodResolver(ProfileUpdateValidation),
  });

  async function onSubmit(values: z.infer<typeof ProfileUpdateValidation>) {
    /*
        export type IUpdateUser = {
                userId: string;
                name: string;
                username: string;
                password: string;
                bio: string;
                imageId: string;
                imageUrl: URL | string;
        };
    */

    const updatedProfile = await updateProfile({
        userId: user.id,
        name: values.name,
        username: values.username,
        password: values.password,
        bio: values.bio,
        imageId: user.imageUrl,
        imageUrl: values.imageUrl,
    });

    if (!updatedProfile) {
      toast({
        title: "Error",
        description: "Profile update failed",
      });
      return;
    }
    navigate("/profile");
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-9 w-full  max-w-5xl"
        >
          <FormField
            control={form.control}
            name="caption"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shad-form_label">Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder={user.name}
                    className="shad-input"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="shad-form_message" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shad-form_label">Username</FormLabel>
                <FormControl>
                  <Input
                    placeholder={user.username}
                    className="shad-input"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="shad-form_message" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shad-form_label">Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder={user.email}
                    className="shad-input"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="shad-form_message" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shad-form_label">Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Password"
                    className="shad-input"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="shad-form_message" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shad-form_label">
                  Confirm Password
                </FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Confirm Password"
                    className="shad-input"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="shad-form_message" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shad-form_label">Bio</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder={user.bio}
                    className="shad-input"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="shad-form_message" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="shad-form_label">
                  Profile Picture
                </FormLabel>
                <FormControl>
                <FileUploader
                        fieldChange={field.onChange}
                        mediaUrl={user.imageUrl}
                />
                </FormControl>
                <FormMessage className="shad-form_message" />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="shad-button_primary whitespace-nowrap"
            disabled={isLoadingUpdate}
          >
            Update Profile
          </Button>
        </form>
      </Form>
    </>
  );
};
export default UpdateProfileForm;
