const AddMedicalTestData = {
  title: "Ajouter un examen",
  /* Make changes to your profile here. Click save when you&apos;re done. */
  description: "",
};

interface AddMedicalTestProps {
  displayHeader?: boolean;
}

const AddMedicalTest = ({ displayHeader }: AddMedicalTestProps) => {
  return (
    <div>
      {displayHeader && (
        <div>
          <h2>{AddMedicalTestData.title}</h2>
          <p>{AddMedicalTestData.description}</p>
        </div>
      )}

      <div className="p-5">
        Med form: <br />
      </div>
    </div>
  );
};

export { AddMedicalTest, AddMedicalTestData, type AddMedicalTestProps };
