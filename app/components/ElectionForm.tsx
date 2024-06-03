"use client";
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import StudentTable, { columns, dummyData } from "./StudentTable";
import { formSchema } from "@/Models/schema/electionFormSchema";
import { Checkbox } from "@radix-ui/react-checkbox";
import { useRouter } from "next/navigation";
import FormProgress from "./FormProgress";

export default function ElectionForm() {
  const labelStyle = "text-black text-xl font-medium";
  const inputStyle = "bg-blue-100/35 p-5 text-black rounded-2xl";

  const router = useRouter();

  const [SelectedParticipants, setSelectedParticipants] = useState<any[]>([]);
  const [SelectedCandidates, setSelectedCandidates] = useState<any[]>([]);
  const [CandidateErrorMsg, setCandidateErrorMsg] = useState("");
  const [ParticipantErrorMsg, setPariticipantErrorMsg] = useState("");

  const [Page, setPage] = useState<number>(1);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ElectionName: "",
      ElectionDescription: "",
    },
  });

  const handleNext = async () => {
    if (Page == 1) {
      const output = await form.trigger(
        ["ElectionName", "ElectionDescription", "EndDate"],
        { shouldFocus: true }
      );
      if (!output) return;
      setPage(2);
    } else if (Page == 2) {
      if (SelectedCandidates.length == 0) {
        setCandidateErrorMsg("Atleast one candidate must be selected");
        return;
      }
      setPage(Page + 1);
    } else if (Page == 3) {
      if (SelectedParticipants.length == 0) {
        setPariticipantErrorMsg("Atleast one participant must be selected");
        return;
      }
      setPage(Page + 1);
    }
  };

  const handlePrev = () => {
    if (Page == 1) {
      return;
    } else {
      setPage(Page - 1);
    }
  };
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const output = await form.trigger(["Acknowledgement"], {
      shouldFocus: true,
    });
    if (!output) return;
    //logic to initializing an election comes here.
    console.log(values);
    console.log(SelectedCandidates);
    console.log(SelectedParticipants);
    form.reset();
    router.push("/")
  }
  return (
    <div>
      <FormProgress page={Page}/>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full h-full  flex flex-col gap-7"
        >
          {Page == 1 && (
            <>
              <FormField
                control={form.control}
                name="ElectionName"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-1">
                    <FormLabel className={labelStyle}>Election Name</FormLabel>
                    <FormControl>
                      <input
                        placeholder="Enter the election name"
                        {...field}
                        className={inputStyle}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="ElectionDescription"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-1">
                    <FormLabel className={labelStyle}>Election Name</FormLabel>
                    <FormControl>
                      <textarea
                        placeholder="Enter the election name"
                        {...field}
                        className={inputStyle}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="EndDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-1">
                    <FormLabel className={labelStyle}>End Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <button
                            className={`flex items-center w-[300px] ${inputStyle} `}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span className="text-black/50">Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50 text-black" />
                          </button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date < new Date()}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}
            <div className={`${Page == 2 ? 'block' : 'hidden'}`}>
              <p className={labelStyle}>Select the Candidates</p>
              <StudentTable
                data={dummyData}
                columns={columns}
                onRowSelected={(rows: any) => setSelectedCandidates(rows)}
                Errormsg = {CandidateErrorMsg}
              />
            </div>
          <div className={`${Page == 3 ? 'block' : 'hidden'}`}>
              <p className={labelStyle}>Select the Participants</p>
              <StudentTable
                data={dummyData}
                columns={columns}
                onRowSelected={(rows: any) => setSelectedParticipants(rows)}
                Errormsg = {ParticipantErrorMsg}
              />
            </div>
          {Page == 4 && (
            <FormField
              control={form.control}
              name="Acknowledgement"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-1">
                  <FormLabel className={`${labelStyle} text-md`}>
                    <h1 className="texl-3xl font-semibold my-2">Acknoledgement</h1>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Pariatur quia ea maiores neque cumque iste in saepe! Hic
                    dolorum, beatae, dolor exercitationem pariatur, sed autem
                    delectus quas sunt consequuntur iure!
                  </FormLabel>
                  <FormControl>
                    <Checkbox
                      id="check"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className={`${
                        field.value ? "bg-green-400" : "bg-transparent"
                      } border-black border-1 w-[30px] h-[30px] rounded-md`}
                    ></Checkbox>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>
          )}
          <div className="w-[50%] flex justify-between items-center gap-3">
            <button
              className="w-full h-[50px]  text-black border-black border-2 text-md font-semibold py-3 mt-7 rounded-full hover:bg-black hover:text-white "
              onClick={handlePrev}
              type="button"
            >
              Prev
            </button>
            {Page == 4 ? (
              <button
                type="submit"
                className="h-[50px] w-full bg-green-600 text-white text-md font-semibold mt-7 rounded-full hover:bg-black"
              >
                Submit
              </button>
            ) : (
              <button
                className="w-full h-[50px]  text-black border-black border-2 text-md font-semibold py-3 mt-7 rounded-full hover:bg-black hover:text-white "
                onClick={handleNext}
                type="button"
              >
                Next
              </button>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
}