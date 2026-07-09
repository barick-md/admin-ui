export const users = [
    {
      name: "Barick",
      email: "barick@gmail.com",
      street: "Jl. Gemah",
      city: "Tegal",
      age: 25,
      job: "Web Developer"
    },
    {
      name: "Muhammad",
      email: "muhammad@gmail.com",
      street: "Jl. Gemah",
      city: "Semarang",
    },
    {
      name: "Dziellan",
      email: "dziellan@gmail.com",
      street: "Jl. Gemah",
      city: "Pati",
    },
  ];

/*
    export const getUsers = () => {
    return fetch("https://jsonplaceholder.typicode.com/users")
        .then((response) => response.json())
        .then((users) =>
            users.map((user)=>({
                name: user.name,
                email: user.email,
            }))
        )
        .catch((error) => {
            console.error(error);
            throw error;
        });
    };*/

//async

    const age=25;

export const getUsers = async () => {
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users");
        const users = await response.json();
        return users.map((user) => ({
        name: user.name,
        email: user.email,
        street: user.address.street,
        city: user.address.city,
        }));
    } catch (error) {
        console.error("[Services] Gagal mengambil data:", error.message);
        throw error;
    }
};