import { CollegeList } from "@/components/colleges/college-list";
import { getColleges } from "@/services/college.service";

export default async function CollegesPage() {
  const colleges = await getColleges();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-zinc-900">Colleges</h1>
        <p className="mt-2 text-zinc-600">
          Explore and compare colleges across India.
        </p>
      </div>
      <CollegeList colleges={colleges} />
    </div>
  );
}
