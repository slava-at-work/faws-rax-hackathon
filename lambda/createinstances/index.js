// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');
AWS.config.setPromisesDependency(null);
exports.handler = (event, context, callback) => {
  // Create EC2 service object
  var ec2 = new AWS.EC2({apiVersion: '2016-11-15'});

  var params = {
    ImageId: 'ami-162c2575', // Amazon Linux AMI 2017.03.0
    InstanceType: 't2.micro',
    MinCount: 1,
    MaxCount: 1
  };
  var instanceId = "";
  // Create the instance
  ec2.runInstances(params).promise().then((data) => {
    instanceId = data.Instances[0].InstanceId;
    console.log("Created instance", instanceId);
    return instanceId;
  }).then((instanceId) => {
    var params = {
      Resources: [instanceId],
      Tags: [
        {
          Key: 'RackspaceHackathonTeam3',
          Value: 'CreateInstances'
        }
      ]
    };
    return ec2.createTags(params).promise();
  }).then((tags) => {
    console.log(tags);
    callback(null, {
      instanceId: instanceId,
    })
  }).catch(err => {
    console.log(err);
    callback(err);
  })
};
