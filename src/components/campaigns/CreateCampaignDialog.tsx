import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCampaigns } from "@/hooks/useCampaigns";

const formSchema = z.object({
  name: z.string().min(1, "Campaign name is required"),
  objective: z.string().min(1, "Objective is required"),
  dailyBudget: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const objectives = [
  { value: "OUTCOME_ENGAGEMENT", label: "Engagement" },
  { value: "OUTCOME_LEADS", label: "Leads" },
  { value: "OUTCOME_SALES", label: "Sales" },
  { value: "OUTCOME_TRAFFIC", label: "Traffic" },
  { value: "OUTCOME_AWARENESS", label: "Awareness" },
];

interface CreateCampaignDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateCampaignDialog({ open, onOpenChange }: CreateCampaignDialogProps) {
  const { createCampaign, isCreating } = useCampaigns();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      objective: "OUTCOME_ENGAGEMENT",
      dailyBudget: "",
    },
  });

  const onSubmit = (values: FormValues) => {
    createCampaign(
      {
        name: values.name,
        objective: values.objective,
        dailyBudget: values.dailyBudget ? parseFloat(values.dailyBudget) : undefined,
        status: "PAUSED",
      },
      {
        onSuccess: () => {
          form.reset();
          onOpenChange(false);
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create Campaign</DialogTitle>
          <DialogDescription>
            Create a new Click-to-WhatsApp campaign on Meta Ads
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Campaign Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Summer Sale CTWA" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="objective"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Objective</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select an objective" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {objectives.map((obj) => (
                        <SelectItem key={obj.value} value={obj.value}>
                          {obj.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    For Click-to-WhatsApp ads, Engagement or Leads work best
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="dailyBudget"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Daily Budget (INR)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="1"
                      min="85"
                      placeholder="500.00"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Minimum ₹85/day. Leave empty to set later.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button type="submit" variant="whatsapp" disabled={isCreating}>
                {isCreating ? "Creating..." : "Create Campaign"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
