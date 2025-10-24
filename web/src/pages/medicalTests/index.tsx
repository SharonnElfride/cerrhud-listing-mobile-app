import { MedicalTestsColumns } from "@/components/medical-tests/columns";
import ListTitle from "@/components/shared/ListTitle";
import { DataTable } from "@/components/ui/custom/data-table/data-table";
import { useAuth } from "@/context/AuthContext";
import type { Tables } from "@/lib/supabase/supabase";
import {
  AddMedicalTestRoute,
  MedicalTestsRoute,
} from "@/navigation/app_routes";
import { canAccessRoute } from "@/navigation/guards";
import { getMedicalTests } from "@/services/MedicalTestsService";
import { useEffect, useState } from "react";

const MedicalTests = ({}) => {
  const { user } = useAuth();
  const [data, setData] = useState<Tables<"medical_tests">[]>([]);

  useEffect(() => {
    async function loadData() {
      let dt = await getMedicalTests();
      if (dt) setData(dt);
    }

    loadData();
  }, []);

  return (
    <div className="p-5 space-y-5">
      <ListTitle title="Examens médicaux" description="Exams desc" />

      <div className="mx-auto">
        <DataTable
          columns={MedicalTestsColumns}
          data={data}
          appRoute={MedicalTestsRoute}
          addDataButtonText="Ajouter un examen"
          // addDataButtonOnClick
          canAccessMoreButton={canAccessRoute(AddMedicalTestRoute, user)}
        />
      </div>
    </div>
  );
};

export default MedicalTests;
