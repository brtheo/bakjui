registerPaint('inset-bottom-bar',class  {
  static get inputProperties() { return ['--dropPosition'] }
  static get contextOptions() { return {alpha: true}}
  static get inputArguments() { return ['<color>'] }

  paint(ctx, geom, props, args) {
    const position = parseFloat(props.get('--dropPosition').toString()),
          color = args[0],
          {width, height} = geom,
          p = n => width * (n/100),
          gap = 115,
          offset = gap/2,
          start = p(position) - offset,
          end = p(position) + offset,
          quadra = 22,
          bezier = 30
      ctx.fillStyle = color
      ctx.beginPath()
      ctx.moveTo(0,0)

      ctx.lineTo(start, 0)
      ctx.quadraticCurveTo(start + quadra, 0 ,start + quadra, 5)
      ctx.bezierCurveTo(start + bezier, 47, end - bezier, 47,end - quadra, 5)
      ctx.quadraticCurveTo(end - quadra,0 ,end, 0)
      ctx.lineTo(end, 0)

      ctx.lineTo(width, 0)
      ctx.lineTo(width, height)
      ctx.lineTo(0, height)
      ctx.closePath()
      ctx.fill()
  }
})

