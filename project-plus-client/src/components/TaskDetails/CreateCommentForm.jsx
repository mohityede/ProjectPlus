import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { useDispatch } from "react-redux";
import { createNewComment } from "@/redux/comment/action";
import { getFallback } from "@/utils/utils";

function CreateCommentForm({ taskId, user }) {
  const dispatch = useDispatch();
  const form = useForm({
    comment: "",
  });
  const onSubmit = (data) => {
    data.taskId = Number(taskId);
    dispatch(createNewComment(data));
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
                        <AvatarFallback>
                          {getFallback(user.fullName)}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                    <FormControl>
                      <Input
                        {...field}
                        type="text"
                        className="md:w-[20rem] border border-primary bg-white"
                        placeholder="comment..."
                      />
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            <Button type="submit">Add</Button>
          </form>
        </Form>
      </div>
    </>
  );
}

export default CreateCommentForm;
