import { useState } from "react";
import { findCombinations } from "./Combinations";

function App() {
  //states
  const [result, setResult] = useState([]);
  const [forms, setForms] = useState([
    { formFields: [{ name: "", credit: "", isConstant: false }] },
  ]);
  const [min_credit, setMinCredit] = useState("");
  const [max_credit, setMaxCredit] = useState("");

  //functions
  const handleAddForm = () => {
    const updatedForms = [...forms];
    updatedForms.push({
      formFields: [{ name: "", credit: "", isConstant: false }],
    });
    setForms(updatedForms);
  };

  const handleAddFields = (formIndex) => {
    const updatedForms = [...forms];
    const formFields = updatedForms[formIndex].formFields;
    formFields.push({ name: "", credit: "", isConstant: false });
    setForms(updatedForms);
  };

  const handleremovePlayer = (formIndex, fieldIndex) => {
    const updatedForms = [...forms];
    const formFields = updatedForms[formIndex].formFields;
    formFields.splice(fieldIndex, 1);
    setForms(updatedForms);
  };

  const handleInputChangeName = (formIndex, fieldIndex, event) => {
    const updatedForms = [...forms];
    const formFields = updatedForms[formIndex].formFields;
    formFields[fieldIndex].name = event.target.value;
    setForms(updatedForms);
  };

  const handleInputChangeCredit = (formIndex, fieldIndex, event) => {
    const updatedForms = [...forms];
    const formFields = updatedForms[formIndex].formFields;
    formFields[fieldIndex].credit = event.target.value;
    setForms(updatedForms);
  };

  const handleCheckboxChange = (formIndex, fieldIndex) => {
    const updatedForms = [...forms];
    const formFields = updatedForms[formIndex].formFields;
    formFields[fieldIndex].isConstant = !formFields[fieldIndex].isConstant;
    setForms(updatedForms);
  };

  const handleMinCreditChange = (event) => {
    setMinCredit(event.target.value);
  };

  const handleMaxCreditChange = (event) => {
    setMaxCredit(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const conPlayers = forms.reduce((acc, form) => {
      const constantFields = form.formFields.filter(
        (field) => field.isConstant
      );

      return acc.concat(constantFields);
    }, []);
    console.log({
      forms,
      conPlayers,
      min_credit,
      max_credit,
    });
    setResult(findCombinations(forms, conPlayers, min_credit, max_credit));
  };
  return (
    <div className="w-full bg-gray-200 h-screen">
      <div className="p-4 mx-auto w-full  bg-gray-200">
        <div className="flex justify-center ">
          <div className="mb-3 sm:mt-10 w-[950px] bg-white border shadow-lg rounded-lg overflow-hidden px-2 py-5 sm:px-10 sm:py-10 ">
            <div className="w-full flex justify-center mb-10">
              <p className="font-medium text-2xl font-sans text-gray-400">
                D11 calculator
              </p>
            </div>
            {forms.map((form, formIndex) => (
              <form key={formIndex} className="space-y-4 md:space-y-6 mb-6">
                <div>
                  <label className="block text-md font-medium text-gray-400">
                    Group {formIndex + 1}
                  </label>
                </div>
                {form.formFields.map((field, fieldIndex) => (
                  <div key={fieldIndex} className="flex space-x-4">
                    <input
                      type="text"
                      className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                      placeholder="Enter a name"
                      value={field.name}
                      onChange={(event) =>
                        handleInputChangeName(formIndex, fieldIndex, event)
                      }
                    />
                    <input
                      type="text"
                      placeholder="Enter the credit"
                      className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                      value={field.credit}
                      onChange={(event) =>
                        handleInputChangeCredit(formIndex, fieldIndex, event)
                      }
                    />
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        checked={field.isConstant}
                        onChange={() =>
                          handleCheckboxChange(formIndex, fieldIndex)
                        }
                      />
                      <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300 min-w-fit">
                        CP
                      </label>
                    </div>
                    <div className="flex items-center">
                      <button
                        type="button"
                        className="min-w-fit text-white bg-[#f34141] hover:bg-blue-300 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-full text-sm px-2 sm:px-4 sm:pb-1 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                        onClick={() =>
                          handleremovePlayer(formIndex, fieldIndex)
                        }
                      >
                        x
                      </button>
                    </div>
                  </div>
                ))}
                <button
                  className=" mb-4 min-w-fit text-white bg-[#2d2d2d] hover:bg-blue-300 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  type="button"
                  onClick={() => handleAddFields(formIndex)}
                >
                  Add Players
                </button>
              </form>
            ))}
            <div className="flex space-x-4">
              <div className="min-w-fit">
                <button
                  type="button"
                  className=" mb-4 min-w-fit text-white bg-[#2d2d2d] hover:bg-blue-300 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  onClick={handleAddForm}
                >
                  Add Group
                </button>
              </div>
              <div>
                <input
                  type="number"
                  placeholder="Min Credit"
                  className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  value={min_credit}
                  onChange={handleMinCreditChange}
                />
              </div>
              <div>
                <input
                  type="number"
                  placeholder="Max Credit"
                  className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  value={max_credit}
                  onChange={handleMaxCreditChange}
                />
              </div>
            </div>
            <div className="flex justify-center w-full mt-8">
              <button
                type="submit"
                className="text-white bg-[#40b511] hover:bg-blue-300 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-full text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
            <div className="my-6">
              <div className="flex flex-col space-y-5">
                {result &&
                  result.map((array, index) => {
                    return (
                      <div className="bg-gray-200 rounded m-1 p-2 text-center">
                        <div className="flex justify-between">
                          <p>Team #{index}</p>
                          <p>Credit : {array[1]}</p>
                        </div>
                        <div className="flex space-x-2 flex-wrap">
                          {array[0].map((player) => {
                            return <p>{player}</p>;
                          })}
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
