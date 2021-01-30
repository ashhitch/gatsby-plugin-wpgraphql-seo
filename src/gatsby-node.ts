export const pluginOptionsSchema = ({ Joi }) => {
  return Joi.object({
    rootQuery: Joi.string()
      .description(`Root query for global Yoast Data.`),
    key: Joi.string()
    .default('Wp')
      .description(`Wey uses when setting up WpGraphql e.g Wp`),

  })
}