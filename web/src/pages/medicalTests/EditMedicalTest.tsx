import type { Tables } from "@/lib/supabase/supabase";

const EditMedicalTestData = {
  title: "Éditer un examen",
  /* Make changes to your profile here. Click save when you&apos;re done. */
  description: "",
};

interface EditMedicalTestProps {
  displayHeader?: boolean;
  mediscalTest: Tables<"medical_tests">;
}

const EditMedicalTest = ({
  displayHeader = true,
  mediscalTest,
}: EditMedicalTestProps) => {
  return (
    <div>
      {displayHeader && (
        <div>
          <h2>{EditMedicalTestData.title}</h2>
          <p>{EditMedicalTestData.description}</p>
        </div>
      )}

      <div className="p-5">
        Med test: <br />
        <b>{mediscalTest.id}</b>
      </div>
    </div>
  );
};

export { EditMedicalTest, EditMedicalTestData, type EditMedicalTestProps };
