import { openDB } from "idb";

const initdb = async () =>
  openDB("jate", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("jate")) {
        console.log("jate database already exists");
        return;
      }
      db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
      console.log("jate database created");
    },
  });

// Logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  // console log that the application is updating the database
  console.log("PUT to the database");
  // await the opening of the jate database
  const jateDb = await openDB("jate", 1);
  // create a transaction variable with read write property
  const tx = jateDb.transaction("jate", "readwrite");
  // create a store variable with the objectStore created when the database was made
  const store = tx.objectStore("jate");
  // request the new content be put into the objectStore
  const request = store.put({ value: content });
  // await the request
  const result = await request;
  // console log that the data was saved in the database
  console.log("🚀 - data saved to the database", result);
};

// Logic for a method that gets all the content from the database
export const getDb = async () => {
  // console log that the application is getting from the database
  console.log("GET all from the database");
  // await the opening of the jate database
  const jateDb = await openDB("jate", 1);
  // create a transaction variable with read only property
  const tx = jateDb.transaction("jate", "readonly");
  // create a store variable with the objectStore created when the database was made
  const store = tx.objectStore("jate");
  // request getting all the data from the store
  const request = store.getAll();
  // await the request
  const result = await request;
  // console log the result value
  console.log("result.value", result);
};

initdb();
