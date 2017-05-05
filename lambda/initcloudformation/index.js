var AWS = require('aws-sdk');
AWS.config.setPromisesDependency(null);
var sts = new AWS.STS({apiVersion: '2011-06-15'});
exports.handler = function(event, context) {
  var ROLE_ARN = 'arn:aws:iam::' + accountId + ':role/RackerTeam3CrossAccountSignin'; //Account A Role to assume

  var accountId = event.awsAccountId;
  var customerId = event.customerId;
  var cronSchedule = event.cronSchedule;
  var ec2EventType = event.ec2EventType;
  //console.log("AWS.config",AWS.config);
  sts.assumeRole({
    RoleArn: ROLE_ARN,
    /* required */
    RoleSessionName: 'RackspacehackathonTeam3'/* required */
  }).promise().then(data => {
    var creds = data.Credentials;
    /*var params = {
      StackName: 'RackspacehackathonTeam3',

      Capabilities: [
        CAPABILITY_IAM | CAPABILITY_NAMED_IAM,

      ],
      ClientRequestToken: 'STRING_VALUE',
      DisableRollback: true || false,
      NotificationARNs: [
        'STRING_VALUE',

      ],
      OnFailure: DO_NOTHING | ROLLBACK | DELETE,
      Parameters: [
        {
          ParameterKey: 'STRING_VALUE',
          ParameterValue: 'STRING_VALUE',
          UsePreviousValue: true || false
        },

      ],
      ResourceTypes: [
        'STRING_VALUE',

      ],
      RoleARN: 'STRING_VALUE',
      StackPolicyBody: 'STRING_VALUE',
      StackPolicyURL: 'STRING_VALUE',
      Tags: [
        {
          Key: 'STRING_VALUE',
          Value: 'STRING_VALUE'
        },

      ],
      TemplateBody: 'STRING_VALUE',
      TemplateURL: 'STRING_VALUE',
      TimeoutInMinutes: 0
    };
    var cloudformation = new AWS.CloudFormation({accessKeyId: creds.AccessKeyId, secretAccessKey: creds.SecretAccessKey, sessionToken: creds.SessionToken});

    return cloudformation.createStack(params).promise(); */
    console.log(creds);
    callback(null, creds);
  }).then(res => {
    console.log(res);
    callback(null,res);
  })
  .catch(err => {
    console.log('an error occurred');
    console.log(err, err.stack); // an error occurred
    callback(err);
  });
};
