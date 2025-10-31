import type { Tables } from "@/lib/supabase/supabase";

const EditMedicalTestData = {
  title: "Éditer un examen",
  description:
    "Modifiez les détails d'un examen médical existant, mettez à jour ses informations ou ajustez son prix.",
};

interface EditMedicalTestProps {
  displayHeader?: boolean;
  medicalTest: Tables<"medical_tests">;
}

const EditMedicalTest = ({
  displayHeader = true,
  medicalTest,
}: EditMedicalTestProps) => {
  return (
    <div>
      {displayHeader && (
        <div>
          <h2>{EditMedicalTestData.title}</h2>
          <p>{EditMedicalTestData.description}</p>
        </div>
      )}

      <div className="px-5">
        Med test: <br />
        <b>{medicalTest.id}</b>
      </div>
    </div>
  );
};

export { EditMedicalTest, EditMedicalTestData, type EditMedicalTestProps };
