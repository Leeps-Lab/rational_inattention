import csv
import random
import math
from otree.api import (
    models,
    widgets,
    BaseConstants,
    BaseSubsession,
    BaseGroup,
    BasePlayer,
    Currency as c,
    currency_range,
)

author = 'Your name here'

doc = """
Your app description
"""

def parse_config(config):
    with open('rational_inattention/configs/session_config.csv', newline='') as config_file:
        rows = list(csv.DictReader(config_file))
        rounds = []
        for row in rows:
            rounds.append({
                'round': int(row['round']) if row['round'] else 0,
                'participation_fee': float(row['participation_fee']) if row.get('participation_fee') else 100,
                'initial_bonds': int(row['initial_bonds']) if row.get('initial_bonds') else 1,
                'buy_option': False if row.get('buy_option') == 'False' else True,
                'sell_option': False if row.get('sell_option') == 'False' else True,
                'g': int(row['g']) if row.get('g') else int(random.uniform(0, 100)),
                'k': float(row['k']) if row.get('k') else float(random.uniform(0, 100)),
                'm': int(row['m']) if row.get('m') else int(random.uniform(0, 100)),
                'y': int(row['y']) if row.get('y') else int(random.uniform(0, 100)),
                'q': int(row['q']) if row.get('q') else int(random.uniform(1, 100)), # actual price should be positive
            })
    return rounds
    # reads straight from the config file constants
    # with open('rational_inattention/configs/' + config, newline='') as config_file:
    #     reader = csv.DictReader(config_file)
    #     for row in reader:
    #         num_rounds = int(row['num_rounds'])
    #         endowment = int(row['endowment'])
    #         initial_bonds = int(row['initial_bonds'])
    #         buy_option = True if row['buy_option'] == 'True' else False
    #         sell_option = True if row['sell_option'] == 'True' else False
    #         randomize_data = True if row['generate_random_vars'] == 'True' else False


class Constants(BaseConstants):
    name_in_url = 'rational_inattention'
    players_per_group = None
    num_rounds=10

    def round_number(self):
        return len(parse_config(self.session.config['config_file']))

    def get_expected_value(self):
        return

    def get_default_result(self):
        return

class Subsession(BaseSubsession):
    # initial values of fields for players for each subsession
    g = models.IntegerField()
    k = models.FloatField()
    m = models.IntegerField()
    y = models.IntegerField()
    q = models.IntegerField()
    expected_value = models.FloatField()
    default = models.BooleanField()
    buy_option = models.BooleanField()
    sell_option = models.BooleanField()
    participation_fee = models.FloatField()

    def creating_session(self):
        # print('in creating_session', self.round_number)
        config = self.config
        if not self.config or self.round_number > len(config):
            return
    def get_participation_fee(self):
        if self.participation_fee is None:
            self.participation_fee = self.config.get('participation_fee')
            self.save()
        return self.g
    def get_g(self):
        if self.g is None:
            self.g = self.config.get('g')
            self.save()
        return self.g

    def get_k(self):
        if self.k is None:
            self.k = self.config.get('k')
            self.save()
        return self.k

    def get_m(self):
        if self.m is None:
            self.m = self.config.get('m')
            self.save()
        return self.m

    def get_y(self):
        if self.y is None:
            self.y = self.config.get('y')
            self.save()
        return self.y

    def get_q(self):
        if self.q is None:
            self.q = self.config.get('q')
            self.save()
        return self.q

    def get_expected_value(self):
        if self.expected_value is None:
            self.expected_value = (100 - self.g) + (self.g * self.m * 0.01)
            self.save()
        return self.expected_value

    def get_default(self):
        if self.default is None:
            self.default = self.y < self.g
            self.save()
        return self.default

    def get_buy_option(self):
        if self.buy_option is None:
            self.buy_option = self.config.get('buy_option')
            self.save()
        return self.buy_option

    def get_sell_option(self):
        if self.sell_option is None:
            self.sell_option = self.config.get('sell_option')
            self.save()
        return self.sell_option

    def num_rounds(self):
        return len(parse_config(self.session.config['config_file']))


    @property
    def config(self):
        try:
            return parse_config(self.session.config['config_file'])[self.round_number-1]
        except IndexError:
            # print('index error')
            return None

    # def set_payoffs(self):
    #     groups = self.get_groups()
    #     print('groups', groups)
    #     for group in groups:
    #         group.set_payoffs()

class Group(BaseGroup):
    pass
class Player(BasePlayer):
    width = models.IntegerField(initial=100)
    cost = models.FloatField(initial=0)
    m_low = models.FloatField(initial=0)
    m_high = models.FloatField(initial=100)
    low_val = models.FloatField(initial=0)
    high_val = models.FloatField(initial=100)
    bid_price = models.FloatField(initial=0)
    ask_price = models.FloatField(initial=100)
    bought = models.BooleanField(initial=False)
    sold = models.BooleanField(initial=False)
    round_payoff = models.FloatField(initial=0)
