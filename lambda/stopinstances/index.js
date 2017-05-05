var AWS = require('aws-sdk');
AWS.config.setPromisesDependency(null);
var ec2 = new AWS.EC2();
exports.handler = (event, context, callback) => {
  var params = {
    Filters: [
      {
        Name: 'tag:project',
        Values: ['HackathonTeam3']
      }
    ]
  };

  ec2.describeInstances(params).promise().then(instances => {
    var instanceIds = instances.Reservations.map(reservation => {
      return reservation.Instances[0].InstanceId;
    });
    return instanceIds;

  }).then(instanceIds => {
    var params = {
      InstanceIds: instanceIds
    };
    return ec2.stopInstances(params).promise();
  }).then(data => {
    console.log(data);
    callback(null, data);
  }).catch(err => {
    console.log(err);
    callback(err);
  });
}
