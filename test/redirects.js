var should      = require("should")
var request     = require('request')
var path        = require("path")
var fs          = require("fs")
var exec        = require("child_process").exec
var harp        = require("../")

describe("fallbacks", function(){

  describe("plain 301 file", function(){
    var projectPath = path.join(__dirname, "apps/fallbacks/three-oh-one/plain")
    var outputPath  = path.join(__dirname, "out/fallbacks-three-oh-one-plain")
    var port        = 8117

    before(function(done){
      harp.compile(projectPath, outputPath, function(errors, output){
        harp.server(projectPath, { port: port }, function(){
          done()
        })
      })
    })

    it("should return proper mime type on 301 page", function(done){
      request('http://localhost:'+ port + '/301', function(e,r,b){
        r.statusCode.should.eql(301)
        r.headers.should.have.property("content-type", "text/html; charset=UTF-8")
        done()
      })
    })

  })

  describe("processed 301 file", function(){
    var projectPath = path.join(__dirname, "apps/fallbacks/three-oh-one/processed")
    var outputPath  = path.join(__dirname, "out/fallbacks-three-oh-one-processed")
    var port        = 8118

    before(function(done){
      harp.compile(projectPath, outputPath, function(errors, output){
        harp.server(projectPath, { port: port }, function(){
          done()
        })
      })
    })

    it("should return proper mime type on 301 page", function(done){
      request('http://localhost:'+ port + '/301', function(e, r, b){
        r.statusCode.should.eql(301)
        r.headers.should.have.property("content-type", "text/html; charset=UTF-8")
        done()
      })
    })

  })

  after(function(done){
    exec("rm -rf " + path.join(__dirname, "out"), function(){
      done()
    })
  })

})
