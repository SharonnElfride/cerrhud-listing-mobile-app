import { MedicalTestsColumns } from "@/components/medical-tests/columns";
import { DataTable } from "@/components/ui/custom-data-table";
import type { Tables } from "@/lib/supabase/supabase";
import { getMedicalTests } from "@/services/MedicalTestsService";
import { useEffect, useState } from "react";

const MedicalTests = ({}) => {
  const [data, setData] = useState<Tables<"medical_tests">[]>([]);

  useEffect(() => {
    async function loadData() {
      let dt = await getMedicalTests();
      if (dt) setData(dt);
    }

    loadData();
  }, []);

  return (
    <div className="p-5">
      <h2>MedicalTests</h2>
      <p>List of Medical Tests</p>

      <div className="container mx-auto py-10">
        <DataTable columns={MedicalTestsColumns} data={data} />
      </div>
    </div>
  );
};

export default MedicalTests;
