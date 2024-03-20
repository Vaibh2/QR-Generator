
import inquirer from "inquirer";
import qr from "qr-image";
import fs from "fs";
inquirer
  .prompt([
    {
      message: "Type in your URL: ",
      name: "URL",
    },
  ])
  .then((answers) => {
    const url = answers.URL;
    var qr_svg = qr.image(url);

    // Handle errors during QR code image creation
    qr_svg.on('error', (err) => {
      console.error("Error creating QR code:", err);
    });

    qr_svg.pipe(fs.createWriteStream("qr_img.png"))
      .on('error', (err) => {
        console.error("Error writing QR code image to file:", err);
      })
      .on('finish', () => {
        console.log("QR code image has been saved!");
      });

    fs.writeFile("URL.txt", url, (err) => {
      if (err) {
        console.error("Error saving URL to file:", err);
      } else {
        console.log("The file has been saved!");
      }
    });
  })
  .catch((error) => {
    if (error.isTtyError) {
      console.error("Prompt couldn't be rendered in the current environment");
    } else {
      console.error("Something else went wrong:", error);
    }
  });
