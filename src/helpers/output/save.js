const fs = require("uxp").storage.localFileSystem;
const { error, alert } = require("@adobe/xd-plugin-toolkit/lib/dialogs");
const { createComponentSkeleton } = require("./createComponentSkeleton");

/**
 * save ui components into files
 * @param {*} components an array of objects {name, code}
 */
async function save(components) {
  try {
    const folder = await fs.getFolder();

    if (folder) {
      components.forEach(async ({ name, code }, index) => {
        const file = await folder.createFile(`Component${index}.js`);
        await file.write(createComponentSkeleton(code));
      });

      alert("Files Saved");
    }
  } catch (e) {
    error("Unexpected error occurred");
  }
}

module.exports = {
  save
};
