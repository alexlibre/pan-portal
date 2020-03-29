import dt from "datatables.net";
import responsive from "datatables.net-responsive";
import "datatables.net-dt/css/jquery.datatables.css";
import "datatables.net-responsive-dt/css/responsive.dataTables.css";

const initClientsTables = () => {
  $(document).ready(function() {
    const table = $("#clients-table");
    const tbody = $("#clients-table tbody");

    const filters = {};


    const dt = $("#clients-table").DataTable({
      paging: false,
      info: false,
      searching: false,
      stripe: false,
      responsive: {
        details: {
          type: "column",
          target: "tr"
        }
      },
      columnDefs: [
        {
          className: "control",
          orderable: false,
          targets: 0
        },
        {
          orderable: false,
          targets: [1,2,3,4, -1]
        },
        {
          responsivePriority: 100,
          targets: [1, 4, 6, 7, -1]
        }
      ],
      order: [],
      language: {
        emptyTable: "Нет записей",
        zeroRecords: "Ничего не найдено"
      }
    });

    $('body').on("click", ".js-client-del", function() {
      const id = this.dataset.clientId;
      console.log(id);

      const modal = document.querySelector('.js-modal.is-opened');
      console.log(modal);


      // dt.row($(this).parents("tr"))
      //   .remove()
      //   .draw();
    });

    // redraw table with throttling resize
    let resizeTimer;
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        dt.draw(false);
      }, 200);
    });

    const initEvents = () => {
      $(".orders__control").on("change", function() {
        let attr = this.name.split(" ")[0];
        let value = this.name.split(" ")[1];
        if (!filters[attr]) {
          filters[attr] = [value];
        } else {
          if (this.checked) {
            filters[attr].push(value);
          } else {
            let index = filters[attr].indexOf(value);
            filters[attr].splice(index, 1);
          }
        }

        dt.draw();
      });

      $("#clients-search").on("keyup input", function() {
        dt.search(this.value).draw();
      });

      tbody.on("click", ".dt__more-delete", function() {
        dt.row($(this).parents("tr"))
          .remove()
          .draw();
      });

      tbody.on("click", ".form__item, a", event => {
        event.stopPropagation();
      });

      tbody.on("click", "tr", function(event) {
        if (event.target.classList.contains("control")) return;
        let href = this.dataset.href;
        if (href) window.location.href = href;
      });
    };

    const initFilter = () => {
      $.fn.dataTable.ext.search.push((settings, data, dataIndex) => {
        const nodes = dt
          .row(dataIndex) //get the row to evaluate
          .nodes() //extract the HTML - node() does not support to$
          .to$(); //get as jQuery object

        let passing = true;

        for (let key in filters) {
          if (!filters[key] || !filters[key].length) continue;

          const id = nodes.find(`td[data-${key}]`).data(key);
          passing = filters[key].includes(`${id}`);
          if (!passing) break;
        }

        return passing;
      });
    }
    initEvents();
    initFilter();




    const dealsTable = $("#client-deals").DataTable({
      paging: false,
      info: false,
      searching: false,
      stripe: false,
      responsive: {
        details: {
          type: "column",
          target: "tr"
        }
      },
      columnDefs: [
        {
          className: "control",
          orderable: false,
          targets: 0
        },
        {
          orderable: false,
          targets: '2'
        }
      ],
      order: []
    });
    const applicationsTable = $("#client-applications").DataTable({
      paging: false,
      info: false,
      searching: false,
      stripe: false,
      responsive: {
        details: {
          type: "column",
          target: "tr"
        }
      },
      columnDefs: [
        {
          className: "control",
          orderable: false,
          targets: 0
        },
        {
          orderable: false,
          targets: [2, -1]
        }
      ],
      order: []
    });
    const tasksTable = $("#client-tasks").DataTable({
      paging: false,
      info: false,
      searching: false,
      stripe: false,
      responsive: {
        details: {
          type: "column",
          target: "tr"
        }
      },
      columnDefs: [
        {
          className: "control",
          orderable: false,
          targets: 0
        },
        {
          orderable: false,
          targets: [2, -1]
        }
      ],
      order: []
    });
    const presentationsTable = $("#client-presentations").DataTable({
      paging: false,
      info: false,
      searching: false,
      stripe: false,
      responsive: {
        details: {
          type: "column",
          target: "tr"
        }
      },
      columnDefs: [
        {
          className: "control",
          orderable: false,
          targets: 0
        },
        {
          orderable: false,
          targets: [0, -1]
        }
      ],
      order: []
    });
    const filtersTable = $("#client-filters").DataTable({
      paging: false,
      info: false,
      searching: false,
      stripe: false,
      responsive: {
        details: {
          type: "column",
          target: "tr"
        }
      },
      columnDefs: [
        {
          className: "control",
          orderable: false,
          targets: 0
        },
        {
          orderable: false,
          targets: [2, -1]
        }
      ],
      order: []
    });
    const comparisonsTable = $("#client-comparisons").DataTable({
      paging: false,
      info: false,
      searching: false,
      stripe: false,
      responsive: {
        details: {
          type: "column",
          target: "tr"
        }
      },
      columnDefs: [
        {
          className: "control",
          orderable: false,
          targets: 0
        },
        {
          orderable: false,
          targets: [2, -1]
        }
      ],
      order: []
    });
    const favoriteTable = $("#client-favorite").DataTable({
      paging: false,
      info: false,
      searching: false,
      stripe: false,
      responsive: {
        details: {
          type: "column",
          target: "tr"
        }
      },
      columnDefs: [
        {
          className: "control",
          orderable: false,
          targets: 0
        },
        {
          orderable: false,
          targets: [2, -1]
        }
      ],
      order: []
    });



  });
};

export default initClientsTables;
