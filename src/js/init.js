window.addEventListener('load', init, false);

function init(e) {
  new Phaser.Game(
    /*width=*/320,
    /*height=*/200,
    /*renderer=*/Phaser.CANVAS,
    /*element_id=*/'game',
    /*state=*/ null,
    /*transparent=*/false,
    /*anti_aliasing=*/false
  );
}
