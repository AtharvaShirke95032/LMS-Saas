import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn, getSubjectColor } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";

interface companionsListProps {
  title: string;
  companions?: Companion[];
  classNames?: string;
}
const CompanionsList = ({
  title,
  companions,
  classNames,
}: companionsListProps) => {
  const filtered = companions?.filter(
    (item,index,self)=>
      index === self.findIndex((t)=>t.id===item.id)
  )
  // console.log("filetered:",filtered);
  return (
    <article className={cn("companion-list bg-neutral-900", classNames)}>
      <h2 className="font-bold text-3xl text-white">{title}</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-lg w-2/3 text-white">Lessons</TableHead>
            <TableHead className="text-lg text-white">Subject</TableHead>
            <TableHead className="text-lg text-right text-white">Duration</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filtered?.map(({ id, subject, name, topic, duration,created_at}) => (
            
            <TableRow key={created_at}>
             
              <TableCell>
                
                <Link href={`/companions/${id}`}>
                
                  <div className="flex items-center gap-2">
                    
                    <div className="size-[72px] flex items-center justify-center rounded-lg max-md:hidden" style={{ backgroundColor: getSubjectColor(subject) }}>
                      <Image 
                      src={`/icons/${subject}.svg`}
                      alt={subject}
                      width={35}
                      height={35}
                    />
                    </div>
                    <div className="flex flex-col gap-2">
                      <p className="font-bold text-2xl text-white">
                        {name}
                      </p>
                      <p className="text-lg text-white">
                        {topic}
                      </p>
                    </div>
                  </div>
                </Link>
              </TableCell>
              <TableCell>
                <div className="subject-badge w-fit max-md:hidden">
                  {subject}
                </div>
                <div className="flex items-center justify-center rounded-lg w-fit p-2 md:hidden" >
                  <Image src={`/icons/${subject}.svg`}
                  alt={subject}
                  width={18}
                  height={18}
                  />
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2 w-full">
                  <p className="text-2xl text-white">
                    {duration}{' '}
                    <span className="max-md:hidden">mins</span>
                  </p>
                  <Image src="/icons/clock.svg" alt="minutes" width={14} height={14} className="md:hidden"/>
                </div>
              </TableCell>
            </TableRow>
          ))}
    
        </TableBody>
      </Table>
    </article>
  );
};

export default CompanionsList;
