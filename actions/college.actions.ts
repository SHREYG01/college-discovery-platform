"use server";

import { getColleges, getCollegeById } from "@/services/college.service";
import { collegeSearchSchema } from "@/validations";

export async function searchColleges(formData: FormData) {
  const parsed = collegeSearchSchema.safeParse({
    query: formData.get("query"),
    location: formData.get("location"),
    minFees: formData.get("minFees"),
    maxFees: formData.get("maxFees"),
    minRating: formData.get("minRating"),
    page: formData.get("page"),
  });

  if (!parsed.success) {
    return { error: parsed.error.flatten().fieldErrors };
  }

  const { page, ...filters } = parsed.data;
  const colleges = await getColleges(filters, page);

  return { data: colleges };
}

export async function fetchCollegeById(id: string) {
  const college = await getCollegeById(id);

  if (!college) {
    return { error: "College not found" };
  }

  return { data: college };
}
