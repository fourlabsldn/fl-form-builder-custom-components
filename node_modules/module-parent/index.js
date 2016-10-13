'use strict';

//var parentFile;
//var parentDir;

module.exports = function parentModule(moduleToStart, numParentsToSkip) {
  numParentsToSkip = numParentsToSkip || 0;

  var callingModule = moduleToStart;
  for (var i=0; i <= numParentsToSkip; i++) {
    ////////////////////////////////////////////////////////////////////////////////
    // Trick taken from https://github.com/aseemk/requireDir/blob/master/index.js //
    //                                                                            //
    // make a note of the calling file's path, so that we can resolve relative    //
    // paths. this only works if a fresh version of this module is run on every   //
    // require(), so important: we clear the require() cache each time!           //
    //                                                                            //
    delete require.cache[ callingModule.filename ];
    //                                                                            //
    ////////////////////////////////////////////////////////////////////////////////
    callingModule = callingModule.parent;
  }

  return callingModule;
  //parentFile   = callingModule.filename;
  //parentDir    = path.dirname(parentFile);


  //////////////////////////////////////////////////////////////////////////////////
  //// Trick taken from https://github.com/aseemk/requireDir/blob/master/index.js //
  ////                                                                            //
  //// make a note of the calling file's path, so that we can resolve relative    //
  //// paths. this only works if a fresh version of this module is run on every   //
  //// require(), so important: we clear the require() cache each time!           //
  ////                                                                            //
  //delete require.cache[ __filename ];
  ////                                                                            //
  //////////////////////////////////////////////////////////////////////////////////
  //
  //var parentModule = module.parent;
  //var parentFile   = parentModule.filename;
  //var parentDir    = path.dirname(parentFile);
};

