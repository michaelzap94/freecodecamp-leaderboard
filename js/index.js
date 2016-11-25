"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//AJAX CALL USING PLAIN JS
function apiRecentTopData(fn) {
  var xhrs = new XMLHttpRequest();
  xhrs.onreadystatechange = function () {
    if (xhrs.readyState == 4 && xhrs.status === 200) {
      var topRecentData = JSON.parse(xhrs.response);
      fn(topRecentData);
    } else {
      // alert(xhr.statusText);
    }
  };
  xhrs.open('GET', "https://fcctop100.herokuapp.com/api/fccusers/top/recent");
  xhrs.send();
}
//-----------------------------------------------
apiRecentTopData(function (topRecentData) {
  var Main = function (_React$Component) {
    _inherits(Main, _React$Component);

    function Main() {
      _classCallCheck(this, Main);

      return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
    }

    /* USING JQUERY FOR AJAX CALL MAY DELAY RENDERING THE DATA
    constructor(props) {
        super(props);
        this.state = {
          topRecentData: []
        };
      }
      //ajax call in React using jquery
    componentDidMount() {
      this.serverRequest = $.getJSON(this.props.source, function(result) {
        this.setState({
          topRecentData: result
        });
      }.bind(this));
    }
     componentWillUnmount() {
        this.serverRequest.abort();
      }*/
    //----------------------------- 

    Main.prototype.render = function render() {
      return React.createElement(MyTable, { arrTotal: topRecentData });
    };

    return Main;
  }(React.Component);

  var MyRows = function (_React$Component2) {
    _inherits(MyRows, _React$Component2);

    function MyRows() {
      _classCallCheck(this, MyRows);

      return _possibleConstructorReturn(this, _React$Component2.apply(this, arguments));
    }

    MyRows.prototype.render = function render() {
      return React.createElement(
        "tr",
        null,
        React.createElement(
          "th",
          { className: "positionTable" },
          this.props.order
        ),
        React.createElement(
          "td",
          null,
          React.createElement(
            "a",
            { href: "https://www.freecodecamp.com/" + this.props.username, target: "_blank" },
            React.createElement("img", { style: { width: 45, borderRadius: 5 }, src: this.props.img, className: "userimg" }),
            React.createElement(
              "span",
              null,
              " " + this.props.username
            )
          )
        ),
        React.createElement(
          "td",
          null,
          this.props.recentRank
        ),
        React.createElement(
          "td",
          null,
          this.props.alltimeRank
        )
      );
    };

    return MyRows;
  }(React.Component);

  var MyTable = function (_React$Component3) {
    _inherits(MyTable, _React$Component3);

    function MyTable(props) {
      _classCallCheck(this, MyTable);

      var _this3 = _possibleConstructorReturn(this, _React$Component3.call(this, props));

      _this3.state = {
        variableArr: _this3.recentSort(_this3.props.arrTotal)
      };

      return _this3;
    }

    MyTable.prototype.mySearchFunction = function mySearchFunction(input) {
      var tbody = document.getElementById("myBody");
      var tr = tbody.getElementsByTagName('tr');

      for (var i = 0; i < tr.length; i++) {
        var td = tr[i].getElementsByTagName('td')[0];
        if (td) {
          if (td.innerHTML.toLowerCase().indexOf(input) > -1) {
            tr[i].style.display = '';
          } else {
            tr[i].style.display = 'none';
          }
        }
      }
    };

    MyTable.prototype.sortAllTime = function sortAllTime(arr) {

      ///////SORT ARRAY BY ALLTIME/////////////////////
      function compare(a, b) {
        if (a.alltime < b.alltime) return 1;
        if (a.alltime > b.alltime) return -1;
        return 0;
      }

      var newArrAllTimeSorted = arr.sort(compare);
      ////RETURN AN ARRAY OF ROWS USING .map();///////////////////////////////////
      var userRowAllTime = newArrAllTimeSorted.map(function (object, i) {

        return React.createElement(MyRows, {
          key: i + 1,
          order: i + 1,
          img: object.img,
          username: object.username,
          recentRank: object.recent,
          alltimeRank: object.alltime
        }); //key is an id.
      });
      return userRowAllTime;
    };

    MyTable.prototype.recentSort = function recentSort(arr) {
      ///////SORT ARRAY BY ALLTIME/////////////////////
      function compare(a, b) {
        if (a.recent < b.recent) return 1;
        if (a.recent > b.recent) return -1;
        return 0;
      }

      var newArrAllTimeSorted = arr.sort(compare);
      ////RETURN AN ARRAY OF ROWS USING .map();///////////////////////////////////
      var userRowRecent = newArrAllTimeSorted.map(function (object, i) {
        return React.createElement(MyRows, {
          key: i + 1,
          order: i + 1,
          img: object.img,
          username: object.username,
          recentRank: object.recent,
          alltimeRank: object.alltime
        }); //key is an id.
      });

      return userRowRecent;
    };

    MyTable.prototype.arrowMethodRec = function arrowMethodRec() {
      console.log("called");
      var arrRec = document.querySelector("#arrSpanRec");
      var arrAll = document.querySelector("#arrSpanAll");

      arrRec.innerHTML = ' &dArr;';
      arrAll.innerHTML = '';
    };

    MyTable.prototype.arrowMethodAll = function arrowMethodAll() {
      var arrRec = document.querySelector("#arrSpanRec");
      var arrAll = document.querySelector("#arrSpanAll");

      arrAll.innerHTML = ' &dArr;';
      arrRec.innerHTML = '';
    };

    MyTable.prototype.render = function render() {
      var _this4 = this;

      return React.createElement(
        "div",
        null,
        React.createElement(
          "div",
          { className: "container", id: "#myHeaderId" },
          React.createElement(
            "div",
            null,
            React.createElement(
              "span",
              null,
              React.createElement("img", { id: "fccimg", src: "https://s3.amazonaws.com/freecodecamp/freecodecamp_logo.svg", alt: "FreeCodeCamp logo" })
            ),
            React.createElement(
              "span",
              { id: "mySpan" },
              "Leader Board"
            )
          ),
          React.createElement("input", { className: "form-control", type: "text", id: "searchInput", onChange: function onChange(event) {
              return _this4.mySearchFunction(event.target.value);
            }, placeholder: "Search for Campers.." })
        ),
        React.createElement(
          "div",
          { className: "container" },
          React.createElement(
            "div",
            { className: "table-responsive" },
            React.createElement(
              "table",
              { className: "table  table-hover " },
              React.createElement(
                "thead",
                null,
                React.createElement(
                  "tr",
                  null,
                  React.createElement(
                    "th",
                    { className: "positionTable" },
                    "Ranking"
                  ),
                  React.createElement(
                    "th",
                    null,
                    "Camper's Name"
                  ),
                  React.createElement(
                    "th",
                    { style: { cursor: "pointer" }, onClick: function onClick() {
                        _this4.arrowMethodRec();_this4.setState({ variableArr: _this4.recentSort(_this4.props.arrTotal) });
                      } },
                    "Last 30 days",
                    React.createElement(
                      "span",
                      { id: "arrSpanRec" },
                      " ⇓"
                    )
                  ),
                  React.createElement(
                    "th",
                    { style: { cursor: "pointer" }, onClick: function onClick() {
                        _this4.arrowMethodAll();_this4.setState({ variableArr: _this4.sortAllTime(_this4.props.arrTotal) });
                      } },
                    "All Time",
                    React.createElement("span", { id: "arrSpanAll" })
                  )
                )
              ),
              React.createElement(
                "tbody",
                { id: "myBody" },
                this.state.variableArr
              )
            )
          ),
          React.createElement(
            "footer",
            { className: "text-center" },
            React.createElement("hr", null),
            React.createElement(
              "p",
              null,
              "Written and Coded by ",
              React.createElement(
                "a",
                { href: "https://www.freecodecamp.com/michaelzap94", target: "_blank" },
                "Michael Zapata"
              ),
              "."
            )
          )
        )
      );
    };

    return MyTable;
  }(React.Component);

  ReactDOM.render(React.createElement(Main, { source: "https://fcctop100.herokuapp.com/api/fccusers/top/recent" }), document.querySelector("#myContainer"));
});