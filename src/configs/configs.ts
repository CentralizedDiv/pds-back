class Configs {
  public service = 'gmail';
  public port = 587;
  public user = process.env.MAIL_USER;
  public password = process.env.MAIL_PASSWORD;
}

export default new Configs();
