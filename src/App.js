import { useState } from "react";
import { findCombinations } from "./Combinations";

function App() {
  //states
  const [result, setResult] = useState([]);
  const [query, setQuery] = useState("");
  const [forms, setForms] = useState([
    {
      formFields: [
        {
          name: "",
          credit: "",
          isConstant: false,
          team: "",
          points: "",
          isExcluded: false,
        },
      ],
    },
  ]);
  const [min_credit, setMinCredit] = useState("");
  const [max_credit, setMaxCredit] = useState("");
  const [team_size, setTeamSize] = useState("");
  const [game, setGame] = useState("");
  const [isFilterEnabled, setIsFilterEnabled] = useState(false);

  //functions

  const handleAddForm = () => {
    const updatedForms = [...forms];
    updatedForms.push({
      formFields: [
        {
          name: "",
          credit: "",
          isConstant: false,
          points: "",
          isExcluded: false,
        },
      ],
    });
    setForms(updatedForms);
  };

  const clearAllPoints = () => {
    const updatedForms = forms.map((group) => {
      const updatedFields = group.formFields.map((field) => {
        if (field.points) {
          return { ...field, points: "" };
        }
        return field;
      });
      return { ...group, formFields: updatedFields };
    });
    setForms(updatedForms);
  };

  const handleDeleteGroup = (formIndex) => {
    const updatedForms = [...forms];
    updatedForms.splice(formIndex, 1);
    setForms(updatedForms);
  };

  const handleTeamChange = (formIndex, fieldIndex, event) => {
    const updatedForms = [...forms];
    const formFields = updatedForms[formIndex].formFields;
    formFields[fieldIndex].team = event.target.value;
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
  const handleInputChangePoints = (formIndex, fieldIndex, event) => {
    const updatedForms = [...forms];
    const formFields = updatedForms[formIndex].formFields;
    formFields[fieldIndex].points = event.target.value;
    setForms(updatedForms);
  };

  const handleCheckboxChange = (formIndex, fieldIndex) => {
    const updatedForms = [...forms];
    const formFields = updatedForms[formIndex].formFields;
    formFields[fieldIndex].isConstant = !formFields[fieldIndex].isConstant;
    setForms(updatedForms);
  };

  const handleIsExcluded = (formIndex, fieldIndex) => {
    const updatedForms = [...forms];
    const formFields = updatedForms[formIndex].formFields;
    formFields[fieldIndex].isExcluded = !formFields[fieldIndex].isExcluded;
    setForms(updatedForms);
  };

  const handleMinCreditChange = (event) => {
    setMinCredit(event.target.value);
  };

  const handleTeamSize = (event) => {
    setTeamSize(event.target.value);
  };

  const handleGame = (event) => {
    setGame(event.target.value);
  };

  const handleMaxCreditChange = (event) => {
    setMaxCredit(event.target.value);
  };

  const handleSubmit = async (event) => {
    setIsFilterEnabled(true);

    const conPlayers = forms.reduce((acc, form) => {
      const constantFields = form.formFields.filter(
        (field) => field.isConstant
      );

      return acc.concat(constantFields);
    }, []);

    const excludedPlayers = forms.reduce((acc, form) => {
      const constantFields = form.formFields.filter(
        (field) => field.isExcluded
      );

      return acc.concat(constantFields);
    }, []);

    const teamAplayers = forms
      .map((form) =>
        form.formFields
          .filter((field) => field.team === "teamA")
          .map((field) => field.name)
      )
      .flat();

    const teamBplayers = forms
      .map((form) =>
        form.formFields
          .filter((field) => field.team === "teamB")
          .map((field) => field.name)
      )
      .flat();

    // console.log(teamAplayers);
    // console.log(teamBplayers);
    // console.log({
    //   forms,
    //   conPlayers,
    //   min_credit,
    //   max_credit,
    //   team_size,
    //   game,
    //   teamBplayers,
    //   teamAplayers,
    // });

    // const saumit = {
    //   forms: [
    //     {
    //       formFields: [
    //         {
    //           name: "sa",
    //           credit: "12",
    //           isConstant: false,
    //           team: "teamA",
    //         },
    //         {
    //           name: "asd",
    //           credit: "14",
    //           isConstant: false,
    //           team: "teamB",
    //         },
    //         {
    //           name: "xcvb",
    //           credit: "13",
    //           isConstant: false,
    //           team: "teamA",
    //         },
    //         {
    //           name: "xcv",
    //           credit: "10",
    //           isConstant: false,
    //           team: "teamB",
    //         },
    //       ],
    //     },
    //     {
    //       formFields: [
    //         {
    //           name: "jhgf",
    //           credit: "12",
    //           isConstant: false,
    //           team: "teamA",
    //         },
    //         {
    //           name: "lkjh",
    //           credit: "13",
    //           isConstant: false,
    //           team: "teamB",
    //         },
    //         {
    //           name: "oiuy",
    //           credit: "12",
    //           isConstant: false,
    //           team: "teamA",
    //         },
    //       ],
    //     },
    //     {
    //       formFields: [
    //         {
    //           name: "lkjhg",
    //           credit: "10",
    //           isConstant: false,
    //           team: "teamA",
    //         },
    //         {
    //           name: "sdfghj",
    //           credit: "9",
    //           isConstant: true,
    //           team: "teamB",
    //         },
    //         {
    //           name: "lkjhgf",
    //           credit: "10",
    //           isConstant: false,
    //           team: "teamB",
    //         },
    //       ],
    //     },
    //   ],
    //   conPlayers: [
    //     {
    //       name: "sdfghj",
    //       credit: "9",
    //       isConstant: true,
    //       team: "teamB",
    //     },
    //   ],
    //   min_credit: "0",
    //   max_credit: "100",
    //   team_size: "7",
    //   game: "Handball",
    //   teamBplayers: ["asd", "xcv", "lkjh", "sdfghj", "lkjhgf"],
    //   teamAplayers: ["sa", "xcvb", "jhgf", "oiuy", "lkjhg"],
    // };

    // const arr = findCombinations(
    //   saumit.forms,
    //   saumit.conPlayers,
    //   saumit.min_credit,
    //   saumit.max_credit,
    //   saumit.team_size,
    //   saumit.teamAplayers,
    //   saumit.teamBplayers,
    //   saumit.game
    // );

    const arr = findCombinations(
      forms,
      conPlayers,
      min_credit,
      max_credit,
      team_size,
      teamAplayers,
      teamBplayers,
      game,
      excludedPlayers
    );

    // eslint-disable-next-line array-callback-return
    let l = arr.filter((r) => {
      let s = r[1].join("");
      if (s.includes(query)) {
        return r;
      } else {
        setResult(arr);
      }
    });
    setResult(l);
  };

  const sortListBasedOnPoints = () => {
    const array = [...result];
    const sort_List = array.sort((a, b) => b[3] - a[3]);
    // eslint-disable-next-line array-callback-return
    let l = sort_List.filter((r) => {
      let s = r[1].join("");
      if (s.includes(query)) {
        return r;
      } else {
        setResult(sort_List);
      }
    });
    setResult(l);
  };

  const sortListBasedOnCredits = () => {
    const array = [...result];
    const sort_List = array.sort((a, b) => b[2] - a[2]);
    // eslint-disable-next-line array-callback-return
    let l = sort_List.filter((r) => {
      let s = r[1].join("");
      if (s.includes(query)) {
        return r;
      } else {
        setResult(sort_List);
      }
    });
    setResult(l);
  };

  return (
    <div className="w-full bg-gray-200 h-screen">
      <div className="p-4 mx-auto w-full  bg-gray-200">
        <div className="flex justify-center ">
          <div className="mb-3 sm:mt-10 sm:w-[950px] bg-white border shadow-lg rounded-lg overflow-hidden px-2 py-5 sm:px-10 sm:py-10 ">
            <div className="w-full flex justify-center mb-10">
              <p className="font-medium text-2xl font-sans text-gray-400">
                Team Maker
              </p>
            </div>
            <div className="flex space-x-4 mb-5 md:space-x-10">
              <div className="min-w-max">
                <select
                  value={game}
                  onChange={handleGame}
                  placeholder="Select Game"
                  className="form-control block w-full px-2.5 py-1.5 text-sm  sm:text-base font-normal text-gray-400 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                >
                  <option className="font-normal">Select Game</option>
                  <option value="Cricket">Cricket</option>
                  <option value="Football">Football</option>
                  <option value="Basketball">Basketball</option>
                  <option value="Hockey">Hockey</option>
                  <option value="Handball">Handball</option>
                  <option value="Volleyball">Volleyball</option>
                  <option value="Kabaddi">Kabaddi</option>
                  <option value="Baseball">Baseball</option>
                </select>
              </div>
              <div className="min-w-min">
                <input
                  type="number"
                  className="form-control block w-full px-3 py-1.5 text-sm sm:text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  placeholder="Team size"
                  value={team_size}
                  onChange={handleTeamSize}
                />
              </div>
            </div>
            {forms.map((form, formIndex) => (
              <form key={formIndex} className="space-y-6 md:space-y-10 mb-6">
                <div>
                  <label className="block text-md font-medium text-gray-400">
                    Group {formIndex + 1}
                  </label>
                </div>
                {form.formFields.map((field, fieldIndex) => (
                  <div key={fieldIndex} className="space-y-4">
                    <div className="flex space-x-4">
                      <input
                        type="text"
                        className="form-control block w-full px-3 py-1.5 text-sm sm:text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        placeholder="name"
                        value={field.name}
                        onChange={(event) =>
                          handleInputChangeName(formIndex, fieldIndex, event)
                        }
                      />
                      <input
                        type="text"
                        placeholder="credit"
                        className="form-control block w-full px-3 py-1.5 text-sm sm:text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        value={field.credit}
                        onChange={(event) =>
                          handleInputChangeCredit(formIndex, fieldIndex, event)
                        }
                      />
                      <input
                        type="text"
                        placeholder="pts"
                        className="form-control block w-full px-3 py-1.5 text-sm sm:text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        value={field.points}
                        onChange={(event) =>
                          handleInputChangePoints(formIndex, fieldIndex, event)
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
                    <div className="flex space-x-4 ml-2">
                      <div className="space-x-1">
                        <label className="font-regular text-sm sm:text-md text-gray-600 flex ">
                          <input
                            type="radio"
                            className="mr-1"
                            name={`team-${formIndex}-${fieldIndex}`}
                            value="teamA"
                            checked={field.team === "teamA"}
                            onChange={(event) =>
                              handleTeamChange(formIndex, fieldIndex, event)
                            }
                          />
                          White
                        </label>
                      </div>
                      <div className="space-x-1">
                        <label className="font-regular text-sm sm:text-md text-gray-600 flex">
                          <input
                            type="radio"
                            className="mr-1"
                            name={`team-${formIndex}-${fieldIndex}`}
                            value="teamB"
                            checked={field.team === "teamB"}
                            onChange={(event) =>
                              handleTeamChange(formIndex, fieldIndex, event)
                            }
                          />
                          Black
                        </label>
                      </div>
                      <div className="space-x-1">
                        <label className="font-regular text-sm sm:text-md text-gray-600 flex">
                          <input
                            type="checkbox"
                            className="mr-1"
                            checked={field.isExcluded}
                            onChange={() =>
                              handleIsExcluded(formIndex, fieldIndex)
                            }
                          />
                          Excluded
                        </label>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="flex justify-between">
                  <div className="min-w-fit">
                    <button
                      className=" mb-4 min-w-fit text-white bg-[#2d2d2d] hover:bg-blue-300 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-xs sm:text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                      type="button"
                      onClick={() => handleAddFields(formIndex)}
                    >
                      Add Players
                    </button>
                  </div>
                  <div className="min-w-fit">
                    <button
                      type="button"
                      className=" mb-4 min-w-fit text-white bg-[#f34141] hover:bg-blue-300 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-xs sm:text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                      onClick={() => handleDeleteGroup(formIndex)}
                    >
                      Delete Group
                    </button>
                  </div>
                </div>
              </form>
            ))}
            <div className="flex space-x-4 mt-6">
              <div className="min-w-fit">
                <button
                  type="button"
                  className=" mb-4 min-w-fit text-white bg-[#2d2d2d] hover:bg-blue-300 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-xs sm:text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  onClick={handleAddForm}
                >
                  Add Group
                </button>
              </div>

              <div>
                <input
                  type="number"
                  placeholder="Min Credit"
                  className="form-control block w-full px-3 py-1.5 text-sm sm:text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  value={min_credit}
                  onChange={handleMinCreditChange}
                />
              </div>
              <div>
                <input
                  type="number"
                  placeholder="Max Credit"
                  className="form-control block w-full px-3 py-1.5 text-sm sm:text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  value={max_credit}
                  onChange={handleMaxCreditChange}
                />
              </div>
            </div>
            <div className="flex justify-center w-full mt-6 mb-10">
              <button
                type="submit"
                className="text-white bg-[#40b511] hover:bg-blue-300 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-full text-xs sm:text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                onClick={handleSubmit}
              >
                Generate
              </button>
            </div>
            <div className="mb-6">
              <div className="flex justify-between space-x-4">
                <div className="flex space-x-4">
                  <input
                    type="text"
                    placeholder="search...eg: 5-2, 7-4"
                    disabled={!isFilterEnabled}
                    className="mb-8 form-control block w-full px-3 py-1.5 text-sm sm:text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    onChange={(e) => {
                      setQuery(e.target.value);
                      handleSubmit();
                    }}
                  />
                  <div className="min-w-fit">
                    <button
                      type="button"
                      className=" mb-4 min-w-fit text-white bg-[#f34141] hover:bg-blue-300 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-xs sm:text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                      onClick={clearAllPoints}
                    >
                      Clear Points
                    </button>
                  </div>
                </div>
                <div className="flex space-x-4 text-sm sm:text-base font-light mx-4">
                  <button onClick={sortListBasedOnCredits} className="flex">
                    Credits
                    <p className="ml-1">&#9660;</p>
                  </button>
                  <button onClick={sortListBasedOnPoints} className="flex">
                    Points
                    <p className="ml-1">&#9660;</p>
                  </button>
                </div>
              </div>
              <div className="flex flex-col space-y-5">
                {result &&
                  result.map((array, index) => {
                    return (
                      <div
                        key={index}
                        className="bg-gray-200 rounded m-1 p-2 text-center"
                      >
                        <div className="flex justify-between">
                          <p>Team #{index + 1}</p>
                          <div className="flex">
                            <div className="border border-[#40b511] bg-gray-100 rounded-lg px-3 mx-3 text-sm">
                              <p>{array[1]}</p>
                            </div>
                            <div className="pl-2 text-sm">
                              <p>Credit: {array[2]}</p>
                            </div>
                            <div className="ml-2 text-sm">
                              <p>Points: {array[3]}</p>
                            </div>
                          </div>
                        </div>
                        <div className="flex space-x-2 flex-wrap">
                          {array[0].map((player, index) => {
                            return <p key={index}> {player}</p>;
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
