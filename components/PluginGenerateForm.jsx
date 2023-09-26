"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Loader2 } from "lucide-react";

// Local Dependencies.
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

const formSchema = z.object({
  pluginName: z.string().min(2),
  pluginSlug: z.string().refine(
    (value) => {
      const slugRegex = /^[a-z0-9-]+$/;
      return slugRegex.test(value);
    },
    {
      message:
        "Invalid slug format. Slug can only contain lowercase letters, numbers, and hyphens.",
    }
  ),
  pluginUri: z.string().url(),
  pluginDescription: z.string().min(2),
  pluginVersion: z.string().refine(
    (value) => {
      const versionRegex = /^\d+\.\d+\.\d+$/;
      return versionRegex.test(value);
    },
    {
      message:
        'Invalid version format. Must be in the format "x.y.z" where x, y, and z are integers.',
    }
  ),
  pluginAuthorName: z.string(),
  pluginAuthorUri: z.string().url(),
  pluginTextDomain: z.string(),
});

export default function PluginGenerateForm({ updateData, onSubmit }) {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      pluginName: "",
      pluginSlug: "",
      pluginUri: "",
      pluginDescription: "",
      pluginVersion: "",
      pluginAuthorName: "",
      pluginAuthorUri: "",
      pluginTextDomain: "",
    },
  });

  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    updateData({ [name]: value });
  };

  const handleSubmit = async (formData) => {
    setLoading(true);

    const data = {
      pluginName: formData.pluginName,
      pluginSlug: formData.pluginSlug,
      pluginUri: formData.pluginUri,
      pluginDescription: formData.pluginDescription,
      pluginVersion: formData.pluginVersion,
      pluginAuthorName: formData.pluginAuthorName,
      pluginAuthorUri: formData.pluginAuthorUri,
    };

    const response = await fetch("/api/generate-plugin", {
      method: "POST",
      body: JSON.stringify(data),
    });

    setLoading(false);
    // onSubmit();
  };

  return (
    <>
      <Form {...form}>
        <ScrollArea>
          <div className="col-span-2 h-screen flex flex-col">
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="flex-1 p-8"
            >
              <div className="md:grid md:grid-cols-3 md:gap-6">
                <div className="md:col-span-1">
                  <div className="px-4 sm:px-0 sticky top-0">
                    <h3 className="text-2xl font-semibold leading-none tracking-tight">
                      Plugin Details
                    </h3>
                    <p className="text-sm mt-1 text-muted-foreground">
                      Enter Plugin related details
                    </p>
                  </div>
                </div>
                <div className="mt-5 md:col-span-2 md:mt-0 relative">
                  <Card>
                    <CardHeader></CardHeader>
                    <CardContent className="space-y-5">
                      <FormField
                        control={form.control}
                        name="pluginName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Plugin Name</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                onInput={(e) => handleInputChange(e)}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="pluginSlug"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Plugin Slug</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                onInput={(e) => handleInputChange(e)}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="pluginVersion"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Plugin Version</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                onInput={(e) => handleInputChange(e)}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="pluginUri"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Plugin URI</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                onInput={(e) => handleInputChange(e)}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="pluginDescription"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Plugin Description</FormLabel>
                            <FormControl>
                              <Textarea
                                // placeholder='Plugin Name'
                                {...field}
                                onInput={(e) => handleInputChange(e)}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </CardContent>
                  </Card>
                </div>
              </div>
              <Separator className="my-4" />
              <div className="md:grid md:grid-cols-3 md:gap-6">
                <div className="md:col-span-1">
                  <div className="px-4 sm:px-0 sticky top-0">
                    <h3 className="text-2xl font-semibold leading-none tracking-tight">
                      Author Details
                    </h3>
                    <p className="text-sm mt-1 text-muted-foreground">
                      Enter author related details
                    </p>
                  </div>
                </div>
                <div className="mt-5 md:col-span-2 md:mt-0 relative">
                  <Card>
                    <CardHeader></CardHeader>
                    <CardContent className="space-y-5">
                      <FormField
                        control={form.control}
                        name="pluginAuthorName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Author Name</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                onInput={(e) => handleInputChange(e)}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="pluginAuthorUri"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Author URL</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                onInput={(e) => handleInputChange(e)}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </CardContent>
                  </Card>
                </div>
              </div>
              <Button type="submit" disabled={loading}>
                {loading ? <Loader2 className="animate-spin" /> : "Submit"}
              </Button>
            </form>
          </div>
        </ScrollArea>
      </Form>
    </>
  );
}
