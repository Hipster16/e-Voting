import Navbar from "@/app/components/Navbar";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";

function ElectionInfo() {
  return (
    <main className="w-screen h-screen p-16">
      <div className="w-full h-full rounded-3xl border-1 border-gray-200 p-10 mx-auto">
        <Navbar />
        <div className="w-full h-full mt-12 flex flex-col items-center gap-5">
          <h1 className="text-4xl font-semibold ">Election Name</h1>
          <p className="text-lg w-[70%]">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis velit
            optio pariatur nisi ipsum adipisci exercitationem ratione quam
            rerum. Sunt assumenda dolorum corrupti praesentium accusantium
            accusamus ipsum nisi porro fugit. Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Nobis velit optio pariatur nisi ipsum
            adipisci exercitationem ratione quam rerum. Sunt assumenda dolorum
            corrupti praesentium accusantium accusamus ipsum nisi porro fugit.
          </p>
          <div className="w-[50%] flex flex-col mt-5 gap-5">
            <h1 className="text-center w-full text-2xl font-semibold">
              Vote Now
            </h1>
            <Table className="bg-slate-100/10 rounded-t-lg ">
              <TableHeader className="">
                <TableRow className="flex justify-between text-xl text-white pt-5">
                  <TableHead className="text-white font-semibold">
                    CandidateName
                  </TableHead>
                  <TableHead className="text-white font-semibold">
                    Candidate ID
                  </TableHead>
                  <TableHead className="text-right text-white font-semibold">
                    Option
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="rounded-b-lg">
                <Row/>
                <Row/>
                <Row/>
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </main>
  );
}

function Row() {
  return (
    <TableRow className="flex justify-between items-center">
      <TableCell>
        <p className="text-lg">Candidate Name</p>
      </TableCell>
      <TableCell>
        <p className="text-lg font-medium text-center">Candidate Clg id</p>
      </TableCell>
      <TableCell>
        <Dialog>
          <DialogTrigger className="bg-blue-600 text-lg font-medium py-2 px-5 rounded-full hover:bg-white hover:text-blue-600">
            Vote
          </DialogTrigger>
          <DialogContent className="text-black">
            <DialogHeader className="text-lg">Confirm Vote</DialogHeader>
            <DialogDescription>
              Are you sure? The vote cannot be changed.
            </DialogDescription>
            <DialogFooter>
              <DialogClose className="bg-red-600 text-lg text-white w-[100px] font-medium py-2 px-5 rounded-full hover:bg-black ">
                No
              </DialogClose>
              <button className="bg-blue-600 text-lg text-white w-[100px] font-medium py-2 px-5 rounded-full hover:bg-black hover:text-blue-600">
                yes
              </button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </TableCell>
    </TableRow>
  );
}

export default ElectionInfo;
