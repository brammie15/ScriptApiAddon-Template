// === CONFIGURABLE VARIABLES

const bpfoldername = "reeks2missie8";
const isStoreVersion = true;

// === END CONFIGURABLE VARIABLES

const gulp = require("gulp");
const ts = require("gulp-typescript");
const del = require("del");
const os = require("os");
const spawn = require("child_process").spawn;
const sourcemaps = require("gulp-sourcemaps");
const zip = require("gulp-zip");
const fs = require("fs");
var rename = require("gulp-rename");

const worldsFolderName = "minecraftWorlds";

const regularVersionMojangRoot = os.homedir() + "/appdata/Roaming/Minecraft Education Edition/games/com.mojang/";
const storeVersionMojangRoot =
  os.homedir() +
  "/AppData/Local/Packages/Microsoft.MinecraftEducationEdition_8wekyb3d8bbwe/LocalState/games/com.mojang/";

const mcdir = isStoreVersion ? storeVersionMojangRoot : regularVersionMojangRoot;

function clean_build(callbackFunction) {
  del(["build/behavior_packs/", "build/resource_packs/"]).then(
    (value) => {
      callbackFunction(); // success
    },
    (reason) => {
      callbackFunction(); // error
    }
  );
}

function clean_export(cb) {
  del(["export/**/**"]).then(
    (value) => {
      cb(); // success
    },
    (reason) => {
      cb(); // error
    }
  );
}

function copy_behavior_packs() {
  return gulp.src(["behavior_packs/**/*"]).pipe(gulp.dest("build/behavior_packs"));
}

function copy_resource_packs() {
  return gulp.src(["resource_packs/**/*"]).pipe(gulp.dest("build/resource_packs"));
}

const copy_content = gulp.parallel(copy_behavior_packs, copy_resource_packs);

function compile_scripts() {
  return gulp
    .src("scripts/**/*.ts")
    .pipe(sourcemaps.init())
    .pipe(
      ts({
        module: "es2020",
        moduleResolution: "node",
        lib: ["es2020", "dom"],
        strict: true,
        target: "es2020",
        noImplicitAny: true,
      })
    )
    .pipe(
      sourcemaps.write("../../_" + bpfoldername + "Debug", {
        destPath: bpfoldername + "/scripts/",
        sourceRoot: "./../../../scripts/",
      })
    )
    .pipe(gulp.dest("build/behavior_packs/scripts"));
}

const build = gulp.series(clean_build, copy_content, compile_scripts);

function clean_localmc(callbackFunction) {
  if (!bpfoldername || !bpfoldername.length || bpfoldername.length < 2) {
    console.log("No bpfoldername specified.");
    callbackFunction();
    return;
  }

  del([mcdir + "development_behavior_packs/" + bpfoldername, mcdir + "development_resource_packs/" + bpfoldername], {
    force: true,
  }).then(
    (value) => {
      callbackFunction(); // Success
    },
    (reason) => {
      callbackFunction(); // Error
    }
  );
}

function deploy_localmc_behavior_packs() {
  console.log("Deploying to '" + mcdir + "development_behavior_packs/" + bpfoldername + "'");
  return gulp.src(["build/behavior_packs/**/*"]).pipe(gulp.dest(mcdir + "development_behavior_packs/" + bpfoldername));
}

function deploy_localmc_resource_packs() {
  console.log("Deploying to '" + mcdir + "development_resource_packs/" + bpfoldername + "'");

  return gulp.src(["build/resource_packs/**/*"]).pipe(gulp.dest(mcdir + "development_resource_packs/" + bpfoldername));
}

function getTargetWorldPath() {
  return mcdir + worldsFolderName + "/" + activeWorldFolderName;
}

function getTargetConfigPath() {
  return mcdir + "config";
}

function getTargetWorldBackupPath() {
  return "backups/worlds/" + activeWorldFolderName;
}

function getDevConfigPath() {
  return "config";
}

function getDevWorldPath() {
  return "worlds/default";
}

function getDevWorldBackupPath() {
  return "backups/worlds/devdefault";
}

function clean_localmc_world(callbackFunction) {
  console.log("Removing '" + getTargetWorldPath() + "'");

  del([getTargetWorldPath()], {
    force: true,
  }).then(
    (value) => {
      callbackFunction(); // Success
    },
    (reason) => {
      callbackFunction(); // Error
    }
  );
}

function clean_localmc_config(callbackFunction) {
  console.log("Removing '" + getTargetConfigPath() + "'");

  del([getTargetConfigPath()], {
    force: true,
  }).then(
    (value) => {
      callbackFunction(); // Success
    },
    (reason) => {
      callbackFunction(); // Error
    }
  );
}

function clean_dev_world(callbackFunction) {
  console.log("Removing '" + getDevWorldPath() + "'");

  del([getDevWorldPath()], {
    force: true,
  }).then(
    (value) => {
      callbackFunction(); // Success
    },
    (reason) => {
      callbackFunction(); // Error
    }
  );
}

function clean_localmc_world_backup(callbackFunction) {
  console.log("Removing backup'" + getTargetWorldBackupPath() + "'");

  del([getTargetWorldBackupPath()], {
    force: true,
  }).then(
    (value) => {
      callbackFunction(); // Success
    },
    (reason) => {
      callbackFunction(); // Error
    }
  );
}

function clean_dev_world_backup(callbackFunction) {
  console.log("Removing backup'" + getDevWorldBackupPath() + "'");

  del([getTargetWorldBackupPath()], {
    force: true,
  }).then(
    (value) => {
      callbackFunction(); // Success
    },
    (reason) => {
      callbackFunction(); // Error
    }
  );
}

function backup_dev_world() {
  console.log("Copying world '" + getDevWorldPath() + "' to '" + getDevWorldBackupPath() + "'");
  return gulp
    .src([getTargetWorldPath() + "/**/*"])
    .pipe(gulp.dest(getDevWorldBackupPath() + "/worlds/" + activeWorldFolderName));
}

function deploy_localmc_config() {
  console.log("Copying world 'config/' to '" + getTargetConfigPath() + "'");
  return gulp.src([getDevConfigPath() + "/**/*"]).pipe(gulp.dest(getTargetConfigPath()));
}

function deploy_localmc_world() {
  console.log("Copying world 'worlds/default/' to '" + getTargetWorldPath() + "'");
  return gulp.src([getDevWorldPath() + "/**/*"]).pipe(gulp.dest(getTargetWorldPath()));
}

function ingest_localmc_world() {
  console.log("Ingesting world '" + getTargetWorldPath() + "' to '" + getDevWorldPath() + "'");
  return gulp.src([getTargetWorldPath() + "/**/*"]).pipe(gulp.dest(getDevWorldPath()));
}

function backup_localmc_world() {
  console.log("Copying world '" + getTargetWorldPath() + "' to '" + getTargetWorldBackupPath() + "/'");
  return gulp
    .src([getTargetWorldPath() + "/**/*"])
    .pipe(gulp.dest(getTargetWorldBackupPath() + "/" + activeWorldFolderName));
}

const deploy_localmc = gulp.series(
  clean_localmc,
  function (callbackFunction) {
    callbackFunction();
  },
  gulp.parallel(deploy_localmc_behavior_packs, deploy_localmc_resource_packs)
);

function watch() {
  return gulp.watch(
    ["scripts/**/*.ts", "behavior_packs/**/*", "resource_packs/**/*"],
    gulp.series(build, deploy_localmc)
  );
}

function serve() {
  return gulp.watch(
    ["scripts/**/*.ts", "behavior_packs/**/*", "resource_packs/**/*"],
    gulp.series(stopServer, build, deploy_localmc, startServer)
  );
}

let activeServer = null;

function stopServer(callbackFunction) {
  if (activeServer) {
    activeServer.stdin.write("stop\n");
    activeServer = null;
  }

  callbackFunction();
}

function startServer(callbackFunction) {
  if (activeServer) {
    activeServer.stdin.write("stop\n");
    activeServer = null;
  }

  activeServer = spawn(dedicatedServerPath + "bedrock_server");

  let logBuffer = "";

  let serverLogger = function (buffer) {
    let incomingBuffer = buffer.toString();

    if (incomingBuffer.endsWith("\n")) {
      (logBuffer + incomingBuffer).split(/\n/).forEach(function (message) {
        if (message) {
          if (message.indexOf("Server started.") >= 0) {
            activeServer.stdin.write("script debugger listen 19144\n");
          }
          console.log("Server: " + message);
        }
      });
      logBuffer = "";
    } else {
      logBuffer += incomingBuffer;
    }
  };

  activeServer.stdout.on("data", serverLogger);
  activeServer.stderr.on("data", serverLogger);

  callbackFunction();
}

hasZipped = false;

function rename_zip_to_mcworld(cb) {
  gulp
    .src(["export/export.zip"])
    .pipe(rename(bpfoldername + ".mcworld"))
    .pipe(gulp.dest("export/"));
  //fs.renameSync("export/export.zip", "export/" + bpfoldername + ".mcworld");
  cb();
}

function zip_world(cb) {
  let zip_path = "export/export.zip";
  console.log("export/" + bpfoldername + "/**/**");
  return gulp
    .src(["export/" + bpfoldername + "/**/**"], { base: "export/" + bpfoldername + "/" })
    .pipe(zip("export.zip", { compress: false, buffer: false }))
    .pipe(gulp.dest("export/"));
  // gulp.src(["export/" + bpfoldername + "/**/**"]).pipe(gulp.dest("export/test/"));

  // if (!fs.existsSync(zip_path)) {
  //   cb(new Error("Zip file not found"));
  //   return;
  // }
}

function get_version() {
  let currentTimeStamp = new Date().toISOString().replace(/T/, " ").replace(/\..+/, "");
  return currentTimeStamp;
}

function add_version_to_world_name(cb) {
  let worldNameFilePath = "export/" + bpfoldername + "/levelname.txt";
  let worldName = fs.readFileSync(worldNameFilePath, "utf8");
  currentTimeStamp = get_version();
  worldName = worldName + " " + currentTimeStamp;
  fs.writeFileSync(worldNameFilePath, worldName);
  console.log("Written " + worldName + " to " + worldNameFilePath);
  cb();
}

function copy_build_resource_pack_to_export_folder(cb) {
  return gulp
    .src(["build/resource_packs/" + bpfoldername + "/**/**"])
    .pipe(gulp.dest("export/" + bpfoldername + "/resource_packs/" + bpfoldername));
}

function copy_build_behavior_pack_to_export_folder(cb) {
  return gulp
    .src(["build/behavior_packs/" + bpfoldername + "/**/**"])
    .pipe(gulp.dest("export/" + bpfoldername + "/behavior_packs/" + bpfoldername));
}

function copy_world_to_export_folder(cb) {
  var readLineSync = require("readline-sync");
  let data = get_worlds_paths_and_names(cb);
  let index = readLineSync.keyInSelect(
    data.map((d) => d.name),
    "Which world do you want to copy?"
  );
  if (index === -1) {
    cb();
    return;
  }
  const world = data[index];
  //console.log("Copying world '" + world.path + "' to 'build/worlds/export/'");
  return gulp.src([world.path + "/**/*"]).pipe(gulp.dest("export/" + bpfoldername));

  //copy the build to the correct folder
  cb();
}

function get_worlds_paths_and_names(cb) {
  let data = [];
  const worldsPath = mcdir + worldsFolderName;
  const worlds = fs.readdirSync(worldsPath);
  worlds.forEach((world) => {
    const worldName = fs.readFileSync(worldsPath + "/" + world + "/levelname.txt", "utf8");
    data.push({
      path: worldsPath + "/" + world,
      name: worldName,
    });
  });
  cb();
  return data;
}

function nbt_rename_world(cb) {
  const data = fs.readFileSync("export/" + bpfoldername + "/level.dat");
  const nbt = require("prismarine-nbt");
  nbt.parse(data, function (error, data) {
    if (error) {
      console.log(error);
      return;
    }
    console.log(data.value.LevelName.value);
    data.value.LevelName.value = bpfoldername + " " + get_version();
    const newNbt = nbt.writeUncompressed(data);
    fs.writeFileSync("export/" + bpfoldername + "/level.dat", newNbt);
  });
  cb();
}

exports.clean_build = clean_build;
exports.copy_behavior_packs = copy_behavior_packs;
exports.copy_resource_packs = copy_resource_packs;
exports.compile_scripts = compile_scripts;
exports.copy_content = copy_content;
exports.build = build;
exports.clean_localmc = clean_localmc;
exports.deploy_localmc = deploy_localmc;
exports.default = gulp.series(build, deploy_localmc);
exports.clean = gulp.series(clean_build, clean_localmc);
exports.watch = gulp.series(build, deploy_localmc, watch);
exports.serve = gulp.series(build, deploy_localmc, startServer, serve);
exports.updateworld = gulp.series(
  clean_localmc_world_backup,
  backup_localmc_world,
  clean_localmc_world,
  deploy_localmc_world
);
exports.ingestworld = gulp.series(clean_dev_world_backup, backup_dev_world, clean_dev_world, ingest_localmc_world);
exports.updateconfig = gulp.series(clean_localmc_config, deploy_localmc_config);
exports.compile_world = gulp.series(
  clean_export,
  build,
  copy_world_to_export_folder,
  gulp.parallel(copy_build_behavior_pack_to_export_folder, copy_build_resource_pack_to_export_folder),
  gulp.parallel(add_version_to_world_name, nbt_rename_world)
);
exports.zip = gulp.series(zip_world, rename_zip_to_mcworld);
exports.export = gulp.series(
  clean_export,
  build,
  copy_world_to_export_folder,
  gulp.parallel(copy_build_behavior_pack_to_export_folder, copy_build_resource_pack_to_export_folder),
  gulp.parallel(add_version_to_world_name, nbt_rename_world),
  zip_world,
  rename_zip_to_mcworld
);

exports.test = gulp.series(nbt_rename_world);
