import React from "react";
import {
  Table,
  TableBody,
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
    <article className={cn("companion-list shadow-[0_0_10px_15px_#000000]", classNames)}>
      <h2 className="font-bold text-xl sm:text-2xl lg:text-3xl text-white mb-4 sm:mb-6">{title}</h2>
      {/* Desktop Table View */}
      <div className="hidden md:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-lg w-2/3 text-white">Lessons</TableHead>
              <TableHead className="text-lg text-center text-white">Subject</TableHead>
              <TableHead className="text-lg text-right text-white">Duration</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered?.map(({ id, subject, name, topic, duration,created_at}) => (
              <TableRow key={created_at}>
                <TableCell className="align-middle">
                  <Link href={`/companions/${id}`} prefetch={true}>
                    <div className="flex items-center gap-2">
                      <div className="size-[72px] flex items-center justify-center rounded-lg flex-shrink-0" style={{ backgroundColor: getSubjectColor(subject) }}>
                        <Image 
                          src={`/icons/${subject}.svg`}
                          alt={subject}
                          width={35}
                          height={35}
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <p className="font-bold text-xl lg:text-2xl text-white">
                          {name}
                        </p>
                        <p className="text-base lg:text-lg text-white">
                          {topic}
                        </p>
                      </div>
                    </div>
                  </Link>
                </TableCell>
                <TableCell className="text-center align-middle">
                  <div className="subject-badge w-fit mx-auto">
                    {subject}
                  </div>
                </TableCell>
                <TableCell className="text-right align-middle">
                  <div className="flex items-center gap-2 justify-end">
                    <p className="text-xl lg:text-2xl text-white">
                      {duration} mins
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {filtered?.map(({ id, subject, name, topic, duration, created_at}) => (
          <Link key={created_at} href={`/companions/${id}`} prefetch={true}>
            <div className="bg-neutral-900/50 border border-white/10 rounded-xl p-4 space-y-3 hover:bg-neutral-800/50 transition-colors">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="size-12 sm:size-14 flex items-center justify-center rounded-lg flex-shrink-0" style={{ backgroundColor: getSubjectColor(subject) }}>
                    <Image 
                      src={`/icons/${subject}.svg`}
                      alt={subject}
                      width={24}
                      height={24}
                    />
                  </div>
                  <div className="flex flex-col gap-1 flex-1 min-w-0">
                    <p className="font-bold text-lg text-white truncate">
                      {name}
                    </p>
                    <p className="text-sm text-white/80 line-clamp-2">
                      {topic}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 flex-shrink-0">
                  <Image src="/icons/clock.svg" alt="minutes" width={14} height={14} />
                  <p className="text-base text-white">
                    {duration}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-white/10">
                <div className="subject-badge text-xs">
                  {subject}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </article>
  );
};

export default CompanionsList;
