//https://web.archive.org/web/20161019043332/https://facebook.github.io/react/docs/tutorial.html

// this.props is passed from the surrounding PersonList component
var Person = React.createClass({
  rawMarkup: function() {
    var md = new Remarkable();
    var rawMarkup = md.render(this.props.children.toString());
    return { __html: rawMarkup };
  },
  render: function() {
    return (
      <div className="person">
        <h2 className="personInformation">
          {this.props.firstname + ' ' + this.props.lastname}
        </h2>
        <span dangerouslySetInnerHTML={this.rawMarkup()} />
      </div>
    );
  }
});

//Pass the data to PersonList child component.
//componentDidMount called automatically when the component is
//rendered for the first time.
var PersonBox = React.createClass({
  loadPersonsFromServer: function() {
    $.ajax({
      url: this.props.url,
      dataType: "json",
      cache: false,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  handlePersonSubmit: function(person) {
    var persons = this.state.data;
    var newPersons = persons.concat([person]);
    this.setState({data: newPersons});
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      data: person,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        this.setState({data: persons});
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    this.loadPersonsFromServer();
    setInterval(this.loadPersonsFromServer, this.props.pollInterval);
  },

  render: function() {
    return (
      <div className="personBox">
        <h1>People</h1>
        <PersonList data={this.state.data} />
        <PersonForm onPersonSubmit={this.handlePersonSubmit} />
      </div>
    );
  }
});

//Pass the props to our Person children components.
//Have a map function that creates a Person for each Person that
//we pass. Then, render the array of Persons created.
var PersonList = React.createClass({
  render: function() {
    var personNodes = this.props.data.map(function(person) {
      return (
        <Person firstname={person.firstname} lastname={person.lastname} key={person.loginID}>
          {person.startDate}
        </Person>
      );
    });
    return (
      <div className="personList">
        {personNodes}
      </div>
    );
  }
});

var PersonForm = React.createClass({
  getInitialState: function() {
    return {firstname: '', lastname: '', loginID: '', startDate: ''};
  },
  handleFirstNameChange: function(e) {
    this.setState({firstname: e.target.value});
  },
  handleLastNameChange: function(e) {
    this.setState({lastname: e.target.value});
  },
  handleLoginIdChange: function(e) {
    this.setState({loginID: e.target.value});
  },
  handleStartDateChange: function(e) {
    this.setState({startDate: e.target.value});
  },
  handleSubmit: function(e) {
    e.preventDefault();

    var firstName = this.state.firstname;
    var lastName = this.state.lastname;
    var loginID = this.state.loginID;
    var startDate = this.state.startDate;

    if(!firstName || !lastName || !loginID || !startDate) {
      return;
    }
    this.props.onPersonSubmit({firstname: firstName, lastname: lastName, loginID: loginID, startDate: startDate});
    this.setState({firstname: '', lastname: '', loginID: '', startDate: ''});
  },
  render: function() {
    return (
      <form className="personForm" onSubmit={this.handleSubmit}>

          <input
            type="text"
            placeholder="First name..."
            value={this.state.firstname}
            onChange={this.handleFirstNameChange}
          />
          <input
            type="text"
            placeholder="Last name..."
            value={this.state.lastname}
            onChange={this.handleLastNameChange}
          />
          <input
            type="number"
            placeholder="Numerical login ID..."
            value={this.state.loginID}
            onChange={this.handleLoginIdChange}
          />
          <input
            type="text"
            placeholder="Start date (mm/dd/yyyy)..."
            value={this.state.startDate}
            onChange={this.handleStartDateChange}
          />
          <input type="submit" value="Post"/>
      </form>
    );
  }
});

ReactDOM.render(
  <PersonBox url='/people' pollInterval={2000} />,
  document.getElementById('content')
);
