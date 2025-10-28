import { MedicalTestsColumns } from "@/components/medical-tests/Columns";
import MedicalTestsMasterDetail from "@/components/medical-tests/MasterDetail";
import ListTitle from "@/components/shared/ListTitle";
import { DataTable } from "@/components/ui/custom/data-table/data-table";
import { useAuth } from "@/context/AuthContext";
import type { Tables } from "@/lib/supabase/supabase";
import {
  AddMedicalTestRoute,
  MedicalTestsRoute,
} from "@/navigation/app_routes";
import { canAccessRoute, hasRequiredPermissions } from "@/navigation/guards";
import { getMedicalTests } from "@/services/MedicalTestsService";
import { useEffect, useState } from "react";

const MedicalTests = ({}) => {
  const { user, userPermissions } = useAuth();
  const [medicalTests, setMedicalTests] = useState<Tables<"medical_tests">[]>(
    []
  );

  const [isLoading, setIsLoading] = useState(true);

  async function loadData() {
    setIsLoading(true);
    const data = await getMedicalTests();
    if (data) setMedicalTests(data);
    setIsLoading(false);
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="p-5 space-y-5">
      <ListTitle
        title="Examens médicaux"
        description="Liste des examens disponibles avec leurs détails et tarifs."
      />

      <div className="mx-auto overflow-y-hidden">
        {isLoading ? (
          <div>Loading</div>
        ) : (
          <DataTable
            columns={MedicalTestsColumns(true)}
            data={medicalTests}
            appRoute={MedicalTestsRoute}
            addDataButtonText="Ajouter un examen"
            // addDataButtonOnClick
            canAccessMoreButton={canAccessRoute(AddMedicalTestRoute, user)}
            enableMasterDetail
            masterDetail={MedicalTestsMasterDetail}
            refreshFunction={() => loadData()}
            canAdd={hasRequiredPermissions(userPermissions, [
              "medical_tests.create",
            ])}
            addFunction={() => {}}
            canEdit={hasRequiredPermissions(userPermissions, [
              "medical_tests.update",
            ])}
            editFunction={() => {}}
            canDelete={hasRequiredPermissions(userPermissions, [
              "medical_tests.update",
              "medical_tests.delete",
            ])}
            deleteFunction={() => {}}
          />
        )}
      </div>
    </div>
  );
};

export default MedicalTests;
