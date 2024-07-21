import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { DialogClose } from "../ui/dialog";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback } from "../ui/avatar";

function CreateCommentForm({ taskId }) {
  const form = useForm({
    comment: "",
  });
  const onSubmit = (data) => {
    console.log("taskComment", data);
  };
  return (
    <>
      <div>
        <Form {...form}>
          <form className="flex gap-2" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="comment"
              render={({ field }) => (
                <FormItem>
									<div className="flex gap-2">
										<div>
											<Avatar>
												<AvatarFallback>MY</AvatarFallback>
											</Avatar>
										</div>
										<FormControl>
											<Input
												{...field}
												type="text"
												className="w-[20rem] border border-primary"
												placeholder="comment..."
											/>
										</FormControl>
										<FormMessage />
									</div>
                </FormItem>
              )}
            />

              <Button type="submit">
                Add
              </Button>

          </form>
        </Form>
      </div>
    </>
  );
}

export default CreateCommentForm;