﻿var Chart = ( function () {
    function Chart(svg) {
        this.svg = svg;
        this.svg.addEventListener("click", rectClickHandler);

        this.barWidth = 70;
        this.height = svg.height.baseVal.value;
        this.padding = 15;
        this.labels = document.getElementById("dates");

        this.days;
        this.activity;
        this.redrawLabels;
        this.mode = "calendar";
    }

    Chart.prototype.ready = function (days, activity, redrawLabels) {
        this.activity = activity;
        this.redrawLabels = redrawLabels;

        if (days) this.days = Object.keys(days).map(function (day, index, array) {
            return new Day(day, days[day], this.barWidth, this.height, this.svg);
        }, this);
    };

    Chart.prototype.clear = function () {
        while (this.svg.firstChild)
            this.svg.removeChild(this.svg.firstChild);
    };

    Chart.prototype.draw = function () {
        if (!this.days)
            return;

        if (this.redrawLabels) this.clearLabels();
        var x = this.padding;
        this.days.forEach(function (day, index) {
            if (this.redrawLabels) this.drawLabel(day.date);
            day.draw(x, this.activity);
            x += this.padding + this.barWidth;
        }, this);
    };

    Chart.prototype.drawLabel = function (label) {
        var li = document.createElement("li");
        var span = document.createElement("span");

        span.appendChild(document.createTextNode(label));
        li.appendChild(span);

        this.labels.appendChild(li);
    };

    Chart.prototype.clearLabels = function () {
        while (this.labels.firstChild) {
            this.labels.removeChild(this.labels.firstChild);
        }
    };
    return Chart;
})();