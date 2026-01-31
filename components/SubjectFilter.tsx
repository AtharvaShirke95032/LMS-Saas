"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { subjects } from "@/constants";
import { formUrlQuery, removeKeysFromUrlQuery } from "@jsmastery/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const SubjectFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get("subject");

  const [subject, setSubject] = useState(query);
  console.log(subject);
  useEffect(() => {
    let newUrl = "";
    if (subject === "all") {
      newUrl = removeKeysFromUrlQuery({
        params: searchParams.toString(),
        keysToRemove: ["subject"],
      });
    } else {
      newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "subject",
        value: subject ?? "",
      });
    }
    router.push(newUrl, { scroll: false });
  }, [subject, router, searchParams]);
  return (
    <Select onValueChange={setSubject} value={subject ?? undefined}>
      <SelectTrigger className="w-full sm:w-[180px]">
        <SelectValue placeholder="Subject Filter" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All Subjects</SelectItem>
        {subjects.map((subject) => (
          <SelectItem key={subject} value={subject}>
            {subject}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SubjectFilter;
